import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

const MAX_ATTEMPTS = 8
const WINDOW_SECONDS = 15 * 60

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function toCountRecord(raw: Record<string, string> | null): Record<string, number> {
  if (!raw) return {}
  return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, Number(v) || 0]))
}

// Compares in time independent of how many leading characters match, so the
// endpoint does not leak the secret one byte at a time.
function secureEquals(a: string, b: string) {
  const encoder = new TextEncoder()
  const left = encoder.encode(a)
  const right = encoder.encode(b)
  let mismatch = left.length ^ right.length
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0)
  }
  return mismatch === 0
}

function clientKey(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  return `stats:attempts:${ip}`
}

// A bearer secret with unlimited guesses is a password with extra steps; cap
// the attempts per IP over a rolling window.
async function rateLimit(key: string) {
  try {
    const attempts = await kv.incr(key)
    if (attempts === 1) await kv.expire(key, WINDOW_SECONDS)
    return attempts <= MAX_ATTEMPTS
  } catch {
    return true
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env['STATS_SECRET']
  if (!secret) return json({ error: 'Stats not configured' }, 503)

  const key = clientKey(req)
  if (!(await rateLimit(key))) {
    return json({ error: 'Too many attempts. Try again later.' }, 429)
  }

  const auth =
    req.headers
      .get('authorization')
      ?.replace(/^Bearer\s+/i, '')
      .trim() ||
    req.headers.get('x-stats-secret')?.trim() ||
    ''

  if (!secureEquals(auth, secret)) return json({ error: 'Unauthorized' }, 401)

  try {
    const [citiesRaw, countriesRaw, timelineRaw] = await Promise.all([
      kv.hgetall<Record<string, string>>('visits:cities'),
      kv.hgetall<Record<string, string>>('visits:countries'),
      kv.hgetall<Record<string, string>>('visits:timeline'),
    ])

    // Only reset the attempt counter once credentials have proven valid.
    await kv.del(key).catch(() => {})

    return json(
      {
        cities: toCountRecord(citiesRaw ?? null),
        countries: toCountRecord(countriesRaw ?? null),
        timeline: toCountRecord(timelineRaw ?? null),
      },
      200
    )
  } catch {
    return json({ error: 'Failed to fetch stats' }, 500)
  }
}

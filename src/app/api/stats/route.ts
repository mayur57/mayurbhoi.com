import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

function toCountRecord(
  raw: Record<string, string> | null
): Record<string, number> {
  if (!raw) return {}
  return Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Number(v) || 0])
  )
}

export async function GET(req: NextRequest) {
  const secret = process.env['STATS_SECRET']
  if (!secret) {
    return new Response(JSON.stringify({ error: 'Stats not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const auth =
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim() ||
    req.headers.get('x-stats-secret')?.trim()
  if (auth !== secret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const [citiesRaw, countriesRaw, timelineRaw] = await Promise.all([
      kv.hgetall<Record<string, string>>('visits:cities'),
      kv.hgetall<Record<string, string>>('visits:countries'),
      kv.hgetall<Record<string, string>>('visits:timeline'),
    ])

    const cities = toCountRecord(citiesRaw ?? null)
    const countries = toCountRecord(countriesRaw ?? null)
    const timeline = toCountRecord(timelineRaw ?? null)

    return new Response(
      JSON.stringify({ cities, countries, timeline }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

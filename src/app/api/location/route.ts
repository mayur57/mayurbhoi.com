import { after, NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

import { logVisit } from '../../../utils/logVisit'

export const dynamic = 'force-dynamic'

const FALLBACK = 'somewhere on Earth'
const CURRENT_KEY = 'user_location'

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' })

function decodeHeader(value: string | null) {
  if (!value) return null
  try {
    return decodeURIComponent(value).trim() || null
  } catch {
    return value.trim() || null
  }
}

// Geo comes from the edge network rather than the client, so a visitor can no
// longer decide what every other visitor sees, and no request leaves the site
// for a third party IP lookup.
function readGeo(req: NextRequest) {
  const city = decodeHeader(req.headers.get('x-vercel-ip-city'))
  const code = decodeHeader(req.headers.get('x-vercel-ip-country'))
  if (!city && !code) return null

  let country = code
  if (code?.length === 2) {
    try {
      country = countryNames.of(code.toUpperCase()) ?? code
    } catch {
      country = code
    }
  }

  return { city: city ?? 'Unknown', country: country ?? 'Unknown' }
}

export async function GET(req: NextRequest) {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    const previous = (await kv.get<string>(CURRENT_KEY)) || FALLBACK
    const geo = readGeo(req)

    // Recording this visit must not delay the response the visitor is waiting on.
    if (geo) {
      after(async () => {
        await kv.set(CURRENT_KEY, `${geo.city}, ${geo.country}`)
        await logVisit(geo.city, geo.country)
      })
    }

    return Response.json({ location: previous }, { headers })
  } catch {
    return Response.json({ location: FALLBACK }, { headers })
  }
}

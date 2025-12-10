import { NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

export const revalidate = 300

export async function GET() {
  try {
    const location = (await kv.get('user_location')) || 'somewhere on Earth'
    return new Response(JSON.stringify({ location }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch location' }), {
      status: 500,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { city, country } = await req.json()
    await kv.set('user_location', `${city}, ${country}`)
    return new Response(JSON.stringify({ message: 'Location updated' }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update location' }), {
      status: 500,
    })
  }
}

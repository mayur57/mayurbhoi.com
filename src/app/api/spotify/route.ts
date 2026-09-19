import { NextResponse } from 'next/server'

export const revalidate = 0

const client_id = process.env['SPOTIFY_CLIENT_ID']
const client_secret = process.env['SPOTIFY_CLIENT_SECRET']
const refresh_token = process.env['SPOTIFY_REFRESH']

const DEFAULT_COVER = '/images/default-cover.svg'

type SpotifyArtist = { name: string }

type SpotifyTrack = {
  name: string
  artists: Array<SpotifyArtist>
  album: { name: string; images: Array<{ url: string }> }
  external_urls: { spotify?: string }
}

type NowPlaying = { is_playing: boolean; item: SpotifyTrack }
type RecentlyPlayed = { track: SpotifyTrack; played_at: string }

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

function convertDateFormat(inputDate: string) {
  const date = new Date(inputDate)

  // Convert to IST (UTC+5:30)
  date.setMinutes(date.getMinutes() + 330)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getUTCMonth()]
  const day = date.getUTCDate()

  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${month} ${day}, ${hours}:${minutes} IST`
}

function dejunk(s: string) {
  return s
    .replace(/-\s*(Remastered|Live|From\s*\".*?\"|ft\.|feat\.).*/gi, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) {
    const missing = [
      !client_id && 'SPOTIFY_CLIENT_ID',
      !client_secret && 'SPOTIFY_CLIENT_SECRET',
      !refresh_token && 'SPOTIFY_REFRESH',
    ].filter(Boolean)
    console.error('[spotify] Missing environment variables:', missing.join(', '))
    throw new Error(`Missing Spotify credentials: ${missing.join(', ')}`)
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
  const data = await response.json()

  if (!response.ok) {
    console.error('[spotify] Token request failed:', {
      status: response.status,
      statusText: response.statusText,
      error: data.error,
      errorDescription: data.error_description,
    })
    throw new Error(
      `Spotify token request failed (${response.status}): ${data.error_description || data.error || response.statusText}`
    )
  }

  if (!data.access_token) {
    console.error('[spotify] Token response missing access_token:', data)
    throw new Error('Spotify token response missing access_token')
  }

  return data.access_token
}

const getNowPlaying = async (): Promise<NowPlaying | null> => {
  const accessToken = await getAccessToken()
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204) {
    return null
  }

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('[spotify] Now playing request failed:', {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    })
    return null
  }

  const data = await response.json()
  return data
}

const getRecentlyPlayed = async (): Promise<RecentlyPlayed | null> => {
  const accessToken = await getAccessToken()

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('[spotify] Recently played request failed:', {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    })
    return null
  }

  const data = await response.json()

  if (!data.items || data.items.length === 0) {
    console.error('[spotify] Recently played response has no items')
    return null
  }
  return data.items[0]
}

export async function GET() {
  let nowPlaying
  try {
    nowPlaying = await getNowPlaying()
  } catch (err: unknown) {
    console.error('[spotify] Failed to fetch now playing:', err)
    return NextResponse.json(
      {
        error: 'No healthy upstream. Spotify services are unavailable.',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }

  if (nowPlaying && nowPlaying.is_playing) {
    const { item } = nowPlaying
    return NextResponse.json({
      title: dejunk(item.name),
      artist: item.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
      album: dejunk(item.album.name),
      cover: item.album.images[0]?.url || DEFAULT_COVER,
      isPlaying: true,
      lastPlayed: null,
      url: item.external_urls.spotify || '',
    })
  }

  const recentlyPlayed = await getRecentlyPlayed()

  if (recentlyPlayed) {
    const { track, played_at } = recentlyPlayed
    return NextResponse.json({
      title: dejunk(track.name),
      artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
      album: dejunk(track.album.name),
      cover: track.album.images[0]?.url || DEFAULT_COVER,
      isPlaying: false,
      lastPlayed: convertDateFormat(played_at),
      url: track.external_urls.spotify || '',
    })
  }

  console.error('[spotify] No now playing or recently played data available')
  return NextResponse.json(
    {
      error: 'No Spotify playback data available',
      title: null,
      artist: null,
      album: null,
      isPlaying: false,
      cover: DEFAULT_COVER,
      lastPlayed: null,
    },
    { status: 500 }
  )
}

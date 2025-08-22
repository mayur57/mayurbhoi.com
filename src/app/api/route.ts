export const dynamic = 'force-static'

const docs: string = `

!!! NOT TO BE INDEXED

Documentation for reference since I keep forgetting the schema.

---

Available Endpoints:

1. GET /api/location
   - Description: Fetches the last known user location from KV storage.
   - Success Response (200):
     {
       "location": "City, Country"
     }
   - Error Response (500):
     {
       "error": "Failed to fetch location"
     }

2. POST /api/location
   - Description: Updates user location in KV storage.
   - Request JSON:
     {
       "city": "Mumbai",
       "country": "India"
     }
   - Success Response (200):
     {
       "message": "Location updated"
     }
   - Error Response (500):
     {
       "error": "Failed to update location"
     }

3. GET /api/spotify
   - Description: Returns the currently playing Spotify track. If none, shows the most recently played one.
   - Success Response (Now Playing):
     {
       "title": "Song Name",
       "artist": "Artist 1, Artist 2",
       "album": "Album Name",
       "cover": "https://cover-image-url",
       "isPlaying": true,
       "lastPlayed": null,
       "url": "https://open.spotify.com/track/..."
     }
   - Success Response (Recently Played):
     {
       "title": "Previous Song",
       "artist": "Artist",
       "album": "Album",
       "cover": "https://cover-url",
       "isPlaying": false,
       "lastPlayed": "Aug 5, 14:22 IST",
       "url": "https://open.spotify.com/track/..."
     }
   - Error Response (500):
     {
       "error": "No healthy upstream. Spotify services are unavailable."
     }

Notes:
- All endpoints accept and return JSON.
- /api/spotify uses OAuth2 with refresh token flow.
- Track metadata is cleaned to remove "Remastered", "Live", etc.
`

export function GET() {
  return new Response(docs.trim())
}

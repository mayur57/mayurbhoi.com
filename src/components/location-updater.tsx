'use client'

import { useEffect } from 'react'

export default function LocationUpdater() {
  useEffect(() => {
    const updateLocation = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json')
        const ipData = await ipRes.json()
        const { city, country_name } = ipData
        await fetch('/api/location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city, country: country_name }),
        })
      } catch (error) {
      }
    }

    const timeout = setTimeout(updateLocation, 2000)
    return () => clearTimeout(timeout)
  }, [])

  return null
}

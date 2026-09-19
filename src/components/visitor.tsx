'use client'

import { useEffect, useState } from 'react'

export const LastVisitor = () => {
  const [location, setLocation] = useState('somewhere on Earth')

  useEffect(() => {
    let cancelled = false

    // A single call: the route reports the previous visitor and records this
    // one from edge geo headers on its own.
    fetch('/api/location')
      .then(res => res.json())
      .then(({ location }) => {
        if (!cancelled && location) setLocation(location)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return <p className='text-sm opacity-50 select-none'>Last visit from {location}</p>
}

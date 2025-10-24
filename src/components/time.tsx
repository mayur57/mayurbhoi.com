'use client'

import { useEffect, useState } from 'react'
import { getLocalTime } from 'src/utils/functions'

export const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    // set initial
    setTime(getLocalTime())

    // update every second
    const id = setInterval(() => {
      setTime(getLocalTime())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <p title='IST/+05:30 GMT' className='not-prose mt-0 text-sm opacity-70'>
      <time>{time}</time> local time
    </p>
  )
}

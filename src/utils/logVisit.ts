import { format } from 'date-fns'
import { kv } from '@vercel/kv'

const CITIES_KEY = 'visits:cities'
const COUNTRIES_KEY = 'visits:countries'
const TIMELINE_KEY = 'visits:timeline'

export async function logVisit(city: string, country: string): Promise<void> {
  try {
    const cityLabel = `${city}, ${country}`
    const monthBucket = format(new Date(), 'yyyy-MM')
    const timelineField = `${monthBucket}:${cityLabel}`

    await Promise.all([
      kv.hincrby(CITIES_KEY, cityLabel, 1),
      kv.hincrby(COUNTRIES_KEY, country, 1),
      kv.hincrby(TIMELINE_KEY, timelineField, 1),
    ])
  } catch(e){
    console.error('Error logging visit:', e)
  }
}

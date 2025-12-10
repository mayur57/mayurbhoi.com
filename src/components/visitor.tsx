import { kv } from '@vercel/kv'
import LocationUpdater from './location-updater'

export async function LastVisitor() {
  let location = 'somewhere on Earth'
  
  try {
    location = (await kv.get('user_location')) || 'somewhere on Earth'
  } catch (error) {
  }

  return (
    <>
      <p className='text-sm opacity-50 select-none'>Last visit from {location}</p>
      <LocationUpdater />
    </>
  )
}

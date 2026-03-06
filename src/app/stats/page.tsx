'use client'

import { FormEvent, useState } from 'react'

type StatsPayload = {
  cities: Record<string, number>
  countries: Record<string, number>
  timeline: Record<string, number>
  error?: string
}

export default function StatsPage() {
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState<StatsPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setStats(null)

    try {
      const response = await fetch('/api/stats', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      const data = (await response.json()) as StatsPayload

      if (!response.ok) {
        setError(data.error || 'Failed to fetch stats')
        return
      }

      setStats({
        cities: data.cities || {},
        countries: data.countries || {},
        timeline: data.timeline || {},
      })
      setPassword('')
    } catch {
      setError('Something went wrong while fetching stats')
    } finally {
      setLoading(false)
    }
  }

  const countryEntries =
    stats?.countries != null
      ? Object.entries(stats.countries).sort((a, b) => b[1] - a[1])
      : []

  const cityEntries =
    stats?.cities != null
      ? Object.entries(stats.cities).sort((a, b) => b[1] - a[1])
      : []

  const timelineEntries =
    stats?.timeline != null
      ? Object.entries(stats.timeline).sort((a, b) => a[0].localeCompare(b[0]))
      : []

  if (!stats) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4'>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-sm space-y-3 rounded-lg'>
          <label className='flex flex-col gap-1 text-sm'>
            <input
              type='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
              className='rounded-md border border-neutral-200/60 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-800 dark:focus:border-neutral-500'
              placeholder='Enter password'
            />
          </label>

          <button
            type='submit'
            disabled={loading || password.length === 0}
            className='inline-flex w-full items-center justify-center rounded-md border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-100 dark:bg-white dark:text-black'>
            {loading ? 'Loading…' : 'View'}
          </button>

          {error && <p className='text-sm text-red-500'>{error}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className='min-h-screen px-4 py-10'>
      <div className='mx-auto flex max-w-4xl flex-col gap-6'>
        <div>
          <h1 className='text-lg font-semibold tracking-tight'>Location analytics</h1>
          <p className='mt-1 text-sm opacity-70'>
            Aggregated location stats for visits to this site.
          </p>
        </div>

        {countryEntries.length > 0 && (
          <section>
            <h2 className='mb-2 text-sm font-semibold tracking-tight opacity-70'>
              Top countries
            </h2>
            <div className='overflow-x-auto rounded-md border border-neutral-200/40 dark:border-neutral-800/60'>
              <table className='min-w-full text-sm'>
                <thead className='bg-neutral-50/80 dark:bg-neutral-900/60'>
                  <tr>
                    <th className='px-3 py-2 text-left font-medium text-neutral-500'>
                      Country
                    </th>
                    <th className='px-3 py-2 text-right font-medium text-neutral-500'>
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {countryEntries.map(([country, count]) => (
                    <tr
                      key={country}
                      className='border-t border-neutral-100 dark:border-neutral-900'>
                      <td className='px-3 py-1.5'>{country}</td>
                      <td className='px-3 py-1.5 text-right tabular-nums'>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {cityEntries.length > 0 && (
          <section>
            <h2 className='mb-2 text-sm font-semibold tracking-tight opacity-70'>
              Top cities
            </h2>
            <div className='overflow-x-auto rounded-md border border-neutral-200/40 dark:border-neutral-800/60'>
              <table className='min-w-full text-sm'>
                <thead className='bg-neutral-50/80 dark:bg-neutral-900/60'>
                  <tr>
                    <th className='px-3 py-2 text-left font-medium text-neutral-500'>City</th>
                    <th className='px-3 py-2 text-right font-medium text-neutral-500'>
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cityEntries.map(([city, count]) => (
                    <tr
                      key={city}
                      className='border-t border-neutral-100 dark:border-neutral-900'>
                      <td className='px-3 py-1.5'>{city}</td>
                      <td className='px-3 py-1.5 text-right tabular-nums'>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {timelineEntries.length > 0 && (
          <section>
            <h2 className='mb-2 text-sm font-semibold tracking-tight opacity-70'>Timeline</h2>
            <div className='overflow-x-auto rounded-md border border-neutral-200/40 dark:border-neutral-800/60'>
              <table className='min-w-full text-sm'>
                <thead className='bg-neutral-50/80 dark:bg-neutral-900/60'>
                  <tr>
                    <th className='px-3 py-2 text-left font-medium text-neutral-500'>Date</th>
                    <th className='px-3 py-2 text-right font-medium text-neutral-500'>
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineEntries.map(([date, count]) => (
                    <tr
                      key={date}
                      className='border-t border-neutral-100 dark:border-neutral-900'>
                      <td className='px-3 py-1.5 tabular-nums'>{date}</td>
                      <td className='px-3 py-1.5 text-right tabular-nums'>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import SpotifyLogo from './spotify-logo'
import VinylRecord from './vinyl'

interface Song {
  title: string
  artist: string
  cover: string
  album: string
  lastPlayed?: string
  isPlaying: boolean
  url: string
}

function Shimmer() {
  return <div className='animate-pulse bg-gray-300 dark:bg-gray-700 h-full w-full rounded-md' />
}

function BlurFade({ children }: { children: React.ReactNode }) {
  return (
    <div className='transition-opacity duration-500 ease-in-out opacity-100 animate-fade-in-out'>
      {children}
    </div>
  )
}

function SpotifyWidgetLoading() {
  return (
    <div className='player not-prose flex flex-col bg-[#EAEEEA] dark:bg-[#0E0E0E] border dark:border-[#131313] p-1 rounded-2xl my-10'>
      <a className='flex flex-row gap-4 p-2 bg-white dark:bg-[#18181A] rounded-xl shadow-2xs'>
        <div className='w-[74px] h-16 rounded-md overflow-hidden'>
          <Shimmer />
        </div>
        <div className='flex flex-col justify-center w-full'>
          <BlurFade>
            <div className='h-4 w-24 mb-2'>
              <Shimmer />
            </div>
          </BlurFade>
          <BlurFade>
            <div className='h-3 w-20 mb-1'>
              <Shimmer />
            </div>
          </BlurFade>
          <BlurFade>
            <div className='h-3 w-16'>
              <Shimmer />
            </div>
          </BlurFade>
        </div>
      </a>
      <div className='pt-[12px] pb-[6px] pl-1.5 items-center'>
        <BlurFade>
          <div className='h-2 w-32'>
            <Shimmer />
          </div>
        </BlurFade>
      </div>
    </div>
  )
}

function SpotifyWidgetError({ message = 'Could not fetch data' }) {
  return (
    <div className='player not-prose flex flex-col bg-[#ff00000f] dark:bg-[#77222233] border border-[#ff000028] dark:border-[#ff000021] p-1 rounded-2xl my-10'>
      <div className='flex flex-row gap-4 p-2 bg-white dark:bg-[#18181A] rounded-xl shadow-2xs'>
        <div className='w-14 h-14 rounded-md bg-[#e4c1c1] dark:bg-[#342121]' />
        <div className='flex flex-col justify-center'>
          <BlurFade>
            <h3 className='text-sm font-medium text-red-700 dark:text-red-300'>Error</h3>
          </BlurFade>
          <BlurFade>
            <p className='text-xs opacity-70 text-red-500'>{message}</p>
          </BlurFade>
        </div>
      </div>
      <div>
        <BlurFade>
          <span className='flex items-center gap-2 pt-[6px] pb-[2px] pl-1.5 text-xs leading-normal text-gray-500'>
            <div className='h-2 w-2 bg-red-400 dark:bg-red-500 rounded-full' />
            {message}
          </span>
        </BlurFade>
      </div>
    </div>
  )
}

function SpotifyWidgetLoaded({ data, error }: { data: Song; error?: boolean }) {
  return (
    <div
      className={`player relative not-prose flex flex-col p-1 rounded-[18px] my-10 max-h-[7.5rem] justify-center ${
        error
          ? 'bg-red-100 dark:bg-red-900 border border-red-500 dark:border-red-700'
          : 'bg-[#EAEEEA] dark:bg-[#0E0E0E] border dark:border-[#131313]'
      }`}>
      <a
        href={data.url}
        className='flex flex-row gap-4 p-2 bg-white dark:bg-[#18181A] rounded-[14px] overflow-hidden shadow-sm'>
        {data.isPlaying ? (
          <VinylRecord
            className='-translate-x-12 -translate-y-5'
            spin={data.isPlaying}
            size={110}
            label={
              <Image
                src={data.cover}
                height={64}
                width={64}
                alt='Album Cover'
                className='w-14 h-14 object-fit rounded-full'
              />
            }
          />
        ) : (
          <Image
            src={data.cover}
            height={64}
            width={64}
            alt='Album Cover'
            className='w-16 h-16 rounded-[8px]'
          />
        )}
        <div className={`flex flex-col justify-center ${data.isPlaying && '-translate-x-10'}`}>
          <BlurFade>
            <h3 className='text-sm !font-medium !tracking-tight'>{data.title}</h3>
          </BlurFade>
          <BlurFade>
            <p className='text-xs opacity-70'>{data.artist}</p>
          </BlurFade>
          <BlurFade>
            <p className='text-xs opacity-50'>{data.album}</p>
          </BlurFade>
        </div>
      </a>
      <SpotifyLogo />
      <div>
        {error ? (
          <BlurFade>
            <span className='flex items-center gap-2 pt-[6px] pb-[2px] pl-1.5 text-xs leading-normal text-red-600'>
              <div className='h-2 w-2 bg-red-500 dark:bg-red-400 rounded-full' />
              Could not retrieve last played time
            </span>
          </BlurFade>
        ) : !data.isPlaying && data.lastPlayed ? (
          <BlurFade>
            <span className='flex items-center gap-2 pt-[6px] pb-[2px] pl-1.5 text-xs leading-normal text-gray-500'>
              <div className='h-2 w-2 bg-[#ababab] dark:bg-[#454545] rounded-full' />
              Last played {data.lastPlayed}
            </span>
          </BlurFade>
        ) : (
          data.isPlaying && (
            <BlurFade>
              <span className='flex items-center gap-2 pt-[6px] pb-[2px] pl-2 text-xs leading-normal text-gray-500'>
                <div className='h-2 w-2 bg-green-500 dark:bg-green-200 rounded-full' />
                Currently playing
              </span>
            </BlurFade>
          )
        )}
      </div>
    </div>
  )
}

function SpotifyWidget() {
  const [data, setData] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ status: false, message: null })

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const res = await fetch('/api/spotify')
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        const result: Song = await res.json()
        setData(result)
        setError({ status: false, message: null })
      } catch (err: any) {
        console.error(err)
        setError({ status: true, message: err.message })
      } finally {
        setLoading(false)
      }
    }
    fetchSpotifyData()
  }, [])
  if (process.env['SPOTIFY_CLIENT_ID'] === null || process.env['SPOTIFY_CLIENT_SECRET'] === null)
    return null
  if (loading) return <SpotifyWidgetLoading />
  if (error.status)
    return <SpotifyWidgetError message={error.message ?? 'Error loading Spotify data'} />
  if (!data) return <SpotifyWidgetError />

  return <SpotifyWidgetLoaded data={data} error={error.status} />
}

export default React.memo(SpotifyWidget)

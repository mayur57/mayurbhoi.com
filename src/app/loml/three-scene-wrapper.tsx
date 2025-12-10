'use client'

import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => (
    <div className='absolute inset-0 flex items-center justify-center bg-black text-white z-20'>
      <div className='text-sm'>Loading...</div>
    </div>
  ),
})

export default function ThreeSceneWrapper() {
  return <ThreeScene />
}

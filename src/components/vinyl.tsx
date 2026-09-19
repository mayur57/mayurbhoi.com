import React from 'react'

interface VinylRecordProps {
  size?: number
  label?: React.ReactNode
  spin: boolean
  className?: string
}

function VinylRecord({ size = 300, label, spin, className }: VinylRecordProps) {
  return (
    <div
      className={`relative rounded-full bg-black overflow-hidden shadow-[0_0_24px_rgba(0,0,0,0.55)] ${className}`}
      style={{ width: size, height: size }}>
      <div className={`${spin && 'animate-spin-slow'} relative w-full h-full`}>
        <div className='absolute inset-0 flex items-center justify-center rounded-full'>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className='absolute rounded-full border border-gray-600 opacity-50'
              style={{
                width: `${size - i * (size / 28)}px`,
                height: `${size - i * (size / 28)}px`,
              }}
            />
          ))}
        </div>

        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden'
          style={{
            width: size * 0.5,
            height: size * 0.5,
          }}>
          {label}
        </div>

        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-black'
          style={{
            width: size * 0.05,
            height: size * 0.05,
          }}
        />
      </div>
      <div
        className='absolute inset-0 rounded-full'
        style={{
          background: 'conic-gradient(from 30deg, transparent, white 10%, transparent 25%)',
          opacity: 0.3,
          filter: 'blur(2px)',
        }}
      />
    </div>
  )
}

export default VinylRecord

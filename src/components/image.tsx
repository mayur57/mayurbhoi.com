'use client'

import { useEffect, useRef, useState, type ComponentProps } from 'react'
import Image from 'next/image'

type RoundedImageProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt'> & {
  src: string
  alt: string
  className?: string
}

export function RoundedImage({ src, alt, className, ...rest }: RoundedImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const pinchRef = useRef<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.001
    const newScale = Math.min(Math.max(1, scale + delta), 5)
    setScale(newScale)

    if (newScale === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      if (touch1 && touch2) {
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
        pinchRef.current = distance
      }
    } else if (e.touches.length === 1 && e.touches[0]) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      if (touch1 && touch2) {
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )

        const pinchDistance = pinchRef.current
        if (pinchDistance) {
          const delta = (distance - pinchDistance) * 0.01
          const newScale = Math.min(Math.max(1, scale + delta), 5)
          setScale(newScale)
          pinchRef.current = distance

          if (newScale === 1) {
            setPosition({ x: 0, y: 0 })
          }
        }
      }
    } else if (isDragging && scale > 1 && e.touches[0]) {
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <>
      <div className={`flex flex-col items-center pt-4 ${className || ''}`}>
        <button
          type='button'
          className='cursor-zoom-in'
          aria-label={`Expand image: ${alt}`}
          onClick={() => setIsOpen(true)}>
          <Image
            src={src}
            alt={alt}
            className='article-img border rounded-xl dark:border-[#222]'
            {...rest}
          />
        </button>
        <p className='opacity-70 text-xs text-center sm:px-16'>{alt}</p>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-200'
          onClick={handleBackdropClick}>
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-150 hover:scale-110 active:scale-95'
            aria-label='Close'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>

          {/* Intentionally a raw <img>: the lightbox applies its own pinch/drag
              transforms and must not be resampled by the image optimizer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            alt={alt}
            src={src}
            className='max-w-[90vw] max-h-[90vh] object-contain select-none transition-transform duration-150 ease-out'
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            draggable={false}
          />
        </div>
      )}
    </>
  )
}

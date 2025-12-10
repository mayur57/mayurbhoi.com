'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface RoundedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  [key: string]: any
}

export function RoundedImage(props: RoundedImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

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
        ;(containerRef.current as any).pinchDistance = distance
      }
    } else if (e.touches.length === 1 && e.touches[0]) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
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
        
        const pinchDistance = (containerRef.current as any).pinchDistance
        if (pinchDistance) {
          const delta = (distance - pinchDistance) * 0.01
          const newScale = Math.min(Math.max(1, scale + delta), 5)
          setScale(newScale)
          ;(containerRef.current as any).pinchDistance = distance
          
          if (newScale === 1) {
            setPosition({ x: 0, y: 0 })
          }
        }
      }
    } else if (isDragging && scale > 1 && e.touches[0]) {
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
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
      <div className={`flex flex-col items-center pt-4 ${props.className || ''}`}>
        <div 
          className="cursor-zoom-in"
          onClick={() => setIsOpen(true)}
        >
          <Image
            // alt={props.alt || ''}
            className='article-img border rounded-xl dark:border-[#222]'
            {...props}
          />
        </div>
        <p className='opacity-70 text-xs text-center sm:px-16'>{props.alt}</p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-200"
          onClick={handleBackdropClick}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-150 hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="relative max-w-[90vw] max-h-[90vh] select-none transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
              width: props.width ? `${props.width}px` : '90vw',
              height: props.height ? `${props.height}px` : 'auto',
              aspectRatio: props.width && props.height ? `${props.width} / ${props.height}` : 'auto',
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            <Image
              alt={props.alt}
              src={props.src}
              width={props.width || 1920}
              height={props.height || 1080}
              className="object-contain w-full h-auto"
              quality={90}
              priority
              sizes="90vw"
              unoptimized={props.src.startsWith('http')}
            />
          </div>
        </div>
      )}
    </>
  )
}
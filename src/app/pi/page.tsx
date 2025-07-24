'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import MainLayout from 'src/components/main-layout'
import { ProgressBar } from 'src/components/progress'

function StatCard({ title = 'Section', children }: any) {
  return (
    <div className='bg-[#1A1B1E] rounded-2xl border-white/12 border p-4 uppercase my-4'>
      <p className='font-mono text-sm'>{title}</p>
      {children}
    </div>
  )
}

export default function ServerMonitorPage() {
  const [usage, setUsage] = useState<number[]>([30, 35, 28, 32, 50, 25])
  const baseState = useRef<number[]>([30, 35, 28, 32, 50, 25])

  function generateMockMetrics(): number[] {
    function next(
      current: number,
      min: number,
      max: number,
      volatility = 5,
      spikeChance = 0.05
    ): number {
      let delta = Math.floor(Math.random() * volatility * 2 + 1) - volatility
      if (Math.random() < spikeChance) delta += Math.floor(Math.random() * 20) + 10
      let sinusoidal = Math.sin(Date.now() / 60000) * 5
      let nextVal = current + delta + sinusoidal
      return Math.max(min, Math.min(max, Math.round(nextVal)))
    }

    baseState.current = [
      next(baseState.current[0]!, 10, 95, 6),
      next(baseState.current[1]!, 10, 95, 6),
      next(baseState.current[2]!, 10, 95, 6),
      next(baseState.current[3]!, 10, 95, 6),
      next(baseState.current[4]!, 30, 90, 2, 0.01),
      next(baseState.current[5]!, 10, 80, 4, 0.02),
    ]
    return baseState.current
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setUsage(generateMockMetrics())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <MainLayout>
      <StatCard title='Server'>
        <p className='font-mono text-sm pt-2'>
          Operating System: <span className='opacity-50'>linux</span>
        </p>
        <p className='font-mono text-sm'>
          Uptime: <span className='opacity-50'>3:32:54</span>
        </p>
        <p className='font-mono text-sm'>
          Hostname: <span className='opacity-50'>raspi</span>
        </p>
      </StatCard>
      <StatCard title='CPU'>
        <ProgressBar title='core 1' progress={usage[0]} />
        <ProgressBar title='core 2' progress={usage[1]} />
        <ProgressBar title='core 3' progress={usage[2]} />
        <ProgressBar title='core 4' progress={usage[3]} />
      </StatCard>
      <StatCard title='Disk & Memory'>
        <ProgressBar title='Memory' progress={usage[4]} />
        <ProgressBar title='IOPS' progress={usage[5]} />
      </StatCard>
    </MainLayout>
  )
}

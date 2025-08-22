import { Metadata } from 'next'

import ThreeScene from './scene'

export const metadata: Metadata = {
  title: 'The Love of My Life',
  description: 'Blog by Mayur Bhoi on software development and other interesting things.',
  openGraph: {
    title: 'Posts',
    description: 'Blog by Mayur Bhoi on software development and other interesting things.',
    url: 'https://mayurbhoi.com/posts',
    type: 'website',
    images: [
      {
        url: 'https://mayurbhoi.com/og?title=The Love of My Life&section=true',
        width: 1200,
        height: 630,
        alt: 'Mayur Bhoi',
      },
    ],
  },
}

export default function LOML() {
  return (
    <div className='relative w-full h-screen bg-black'>
      <div className='px-8 absolute left-[50%] -translate-x-[50%] bottom-12 flex flex-col w-full sm:w-xl items-start justify-center z-0'>
        <h2 className='text-4xl font-serif text-gray-200 tracking-tighter'>Diet Coke</h2>
        <p className='text-gray-400 select-none tracking-tight text-sm'>
          Diet Coke is not just a drink, it is the quiet constant that has seen me through every
          deadline, every late-night burst of inspiration, and every quiet afternoon when the world
          feels a little too still. Its crisp bite and subtle sweetness are a ritual, a promise that
          no matter how chaotic things get, there is always a cold can waiting to reset my brain and
          lift my mood. Some people find love in grand gestures; mine comes in silver and red,
          fizzing with familiarity, loyalty, and a touch of caffeine-fueled magic.
        </p>
      </div>

      <div className='absolute inset-0 z-10'>
        <ThreeScene />
      </div>
    </div>
  )
}

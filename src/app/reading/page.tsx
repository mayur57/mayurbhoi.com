'use client'

import Image from 'next/image'

export default function ProjectsPage() {
  const books = [
    {
      title: 'Dune',
      author: 'Frank Herbert',
      year: '1965',
      description:
        'Dune is big. Not just in size, but in scope, in ambition. It is not about space battles or flashy tech. It is about politics, ecology, power. Herbert builds an entire world, a living, breathing thing, so dense with history you feel like an outsider trying to catch up. The writing pulls you in, hypnotic and strange. But it is also slow, full of cryptic dialogue and long introspection. Still, you finish it, and it stays with you. Not because of what happens, but because of what it makes you think about.',
      image: '/images/reading/1.jpg',
      rating: 96,
    },
    {
      title: 'A Train to Pakistan',
      author: 'Khushwant Singh',
      year: '1956',
      description:
        'Train to Pakistan is raw. It does not give you a grand history lesson. It gives you people, ordinary lives ripped apart by something bigger than them. There is love here, but also cruelty, survival, betrayal. Singh writes with an economy of words. No indulgence, just clarity. The violence is not dramatized. It just is. The ending hits like a punch you knew was coming but could not stop. A book that does not just tell a story but forces you to feel it.',
      image: '/images/reading/2.jpg',
      rating: 90,
    },
    {
      title: 'Animal Farm',
      author: 'George Orwell',
      year: '1945',
      description:
        'Animal Farm reads simple. It is short, clear, easy to follow. But then it sits in your head, and you start seeing it everywhere. The way power shifts, how words are twisted, how people forget. Orwell does not waste a sentence. Every word matters. It is funny in places, until it is not. The kind of book that makes you angry, but also helpless. Because you know it is not just a story.',
      image: '/images/reading/3.jpg',
      rating: 95,
    },
  ]

  return (
    <div className='w-full min-h-screen p-6 md:p-12 bg-white'>
      <div className='absolute -top-10 z-50 overflow-hidden w-full text-red-500 border border-y-red-300 border-x-0 mt-[4rem] py-2 -translate-x-12'>
        <div
          className='flex flex-row w-max tracking-wider text-xs animate-marquee'
          style={{
            animation: `marquee 120s linear infinite`,
          }}>
          {'IN DEV · '.repeat(50)}
          {'IN DEV · '.repeat(50)}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
      <div className='flex flex-col gap-24 mt-12'>
        {books.map((project, index) => (
          <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
            <div className='flex flex-col text-xs md:max-w-[500px]'>
              <div className='flex justify-between mb-3'>
                <span className='text-black'>
                  <span className='font-medium'>{project.title}</span>, {project.author}
                </span>
                <span className='text-gray-500'>{project.year}</span>
              </div>
              <p className='leading-relaxed text-gray-700 mb-6'>{project.description}</p>
              <p className='text-xs'>{project.rating}%</p>
            </div>
            <div className='w-full'>
              <Image
                src={project.image}
                alt={project.title}
                height={300}
                width={240}
                className='w-1/4 h-auto saturate-90 shadow-sm'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

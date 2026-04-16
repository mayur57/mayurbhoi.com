import { Metadata } from 'next'
import MainLayout from 'src/components/main-layout'
import { Socials } from 'src/components/socials'
import Title from 'src/components/title'
import { getPosts } from 'src/processor/posts'

import PostTile from './post'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Blog by Mayur Bhoi on software development and other interesting things.',
  openGraph: {
    title: 'Posts',
    description: 'Blog by Mayur Bhoi on software development and other interesting things.',
    url: 'https://mayurbhoi.com/posts',
    type: 'website',
    images: [
      {
        url: 'https://mayurbhoi.com/og?title=Posts&section=true',
        width: 1200,
        height: 630,
        alt: 'Mayur Bhoi',
      },
    ],
  },
}

export default function PostsPage() {
  const blogs = getPosts()
    .filter(post => post.metadata.delist === undefined)
    .sort((a, b) => {
      return new Date(a.metadata.uploaded) > new Date(b.metadata.uploaded) ? -1 : 1
    })
  return (
    <MainLayout>
      <Title>posts</Title>
      <div className='pt-4 pb-24'>
        <div className={`pt-4 animate-fade-up`}>
          {blogs.map((post, index) => (
            <PostTile key={index} post={post.metadata} index={index} />
          ))}
        </div>
      </div>
      <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white my-8' />
      <Socials />
    </MainLayout>
  )
}

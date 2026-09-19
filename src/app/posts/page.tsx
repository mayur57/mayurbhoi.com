import { Metadata } from 'next'
import MainLayout from 'src/components/main-layout'
import { Socials } from 'src/components/socials'
import Title from 'src/components/title'
import { getListedPosts } from 'src/processor/posts'
import { absoluteUrl, ogImageUrl, SITE_DESCRIPTION, SITE_NAME } from 'src/utils/site'

import PostList from './post-list'

export const metadata: Metadata = {
  title: 'Posts',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/posts' },
  openGraph: {
    title: 'Posts',
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/posts'),
    type: 'website',
    images: [
      {
        url: ogImageUrl('Posts', { section: true }),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
}

export default function PostsPage() {
  const posts = getListedPosts().map(post => post.metadata)
  return (
    <MainLayout>
      <Title>posts</Title>
      <PostList posts={posts} />
      <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white my-8' />
      <Socials />
    </MainLayout>
  )
}

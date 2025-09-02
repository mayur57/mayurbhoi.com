import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'
import MainLayout from 'src/components/main-layout'
import { MDX } from 'src/components/mdx'
import { Socials } from 'src/components/socials'
import { Suggestions } from 'src/components/suggestions'
import { getPosts } from 'src/processor/posts'
import { formatDate, generateSuggestions, urlSafe } from 'src/utils/functions'

export default async function ExpandedPost(props: any) {
  const params = await props.params
  const sortedPosts = getPosts().sort((a, b) => {
    return new Date(a.metadata.uploaded) < new Date(b.metadata.uploaded) ? -1 : 1
  })
  const post = sortedPosts.find(post => post.metadata.slug === params.slug)
  if (!post) notFound()
  const { title, description, uploaded, substack } = post?.metadata
  const suggestions = generateSuggestions(sortedPosts, post)
  const uploadDate = formatDate(uploaded)
  const readingMinutes = readingTime(post.content).minutes.toFixed()
  const byline = generateByline(uploadDate, readingMinutes)
  return (
    <MainLayout>
      <div className='prose prose-sm sm:prose dark:prose-invert pt-4'>
        <h1 className='sm:pt-6'>{title}</h1>
        <p className='not-prose opacity-70 text-sm pt-2 pb-1'>{description}</p>
        <div className='not-prose flex items-center justify-between'>
          <span className='opacity-50 text-[11px] font-mono font-medium'>{byline}</span>
          {typeof substack === 'string' ? (
          <div className='not-prose flex items-center justify-center font-sans text-xs text-orange-600 dark:text-orange-300 opacity-100'>
            <a href={substack} target={"_blank"} rel={'noopener noreferrer'}>Also available on Substack ↗</a>
          </div>
        ) : null}
        </div>
        <Divider />
        <MDX className='pt-4 pb-6' source={post.content} />
        <Divider />
        <Suggestions suggestions={suggestions} />
        <Socials />
      </div>
    </MainLayout>
  )
}

function generateByline(uploadDate: string, readingMinutes: string): string {
  const readingText: string = ' • ' + (readingMinutes === '0' ? '<1' : readingMinutes) + ' min read'
  return uploadDate + readingText
}

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map(post => ({
    slug: post.metadata.slug,
  }))
}

export const generateMetadata = async (props: any) => {
  const params = await props.params
  const post = getPosts().find(post => post.metadata.slug === params.slug)
  if (!post) return
  const metadata: Metadata = {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: 'https://mayurbhoi.com/posts/' + post.metadata.slug,
      type: 'website',
      images: [
        {
          url: `https://mayurbhoi.com/og?title=${urlSafe(post.metadata.title)}`,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.description,
      images: [`https://mayurbhoi.com/og?title=${urlSafe(post.metadata.title)}&twitter=true`],
    },
  }
  return metadata
}

function Divider() {
  return <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white mt-4' />
}

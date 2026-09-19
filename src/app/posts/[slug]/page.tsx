import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from 'src/components/main-layout'
import { MDX } from 'src/components/mdx'
import { Socials } from 'src/components/socials'
import { Suggestions } from 'src/components/suggestions'
import { getPosts } from 'src/processor/posts'
import { formatDate, generateSuggestions } from 'src/utils/functions'
import { absoluteUrl, ogImageUrl } from 'src/utils/site'

type PostParams = { slug: string }
type PostProps = { params: Promise<PostParams> }

function chronological() {
  return getPosts().sort(
    (a, b) => new Date(a.metadata.uploaded).getTime() - new Date(b.metadata.uploaded).getTime()
  )
}

export default async function ExpandedPost({ params }: PostProps) {
  const { slug } = await params
  const sortedPosts = chronological()
  const post = sortedPosts.find(post => post.metadata.slug === slug)
  if (!post) notFound()

  const { title, description, uploaded, substack } = post.metadata
  const suggestions = generateSuggestions(sortedPosts, post)
  const byline = generateByline(formatDate(uploaded), post.readingMinutes)

  return (
    <MainLayout>
      <div className='prose prose-sm sm:prose dark:prose-invert pt-4 animate-fade-up'>
        <h1 className='sm:pt-6'>{title}</h1>
        <p className='not-prose opacity-70 text-sm pt-2 pb-1'>{description}</p>
        <div className='not-prose flex items-center justify-between'>
          <span className='opacity-50 text-[11px] font-mono font-medium'>{byline}</span>
          {substack ? (
            <div className='not-prose flex items-center justify-center text-right font-sans text-xs text-orange-600 dark:text-orange-300 opacity-100'>
              <a href={substack} target={'_blank'} rel={'noopener noreferrer'}>
                Also available on Substack ↗
              </a>
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

function generateByline(uploadDate: string, readingMinutes: number): string {
  const rounded = Math.round(readingMinutes)
  return `${uploadDate} • ${rounded < 1 ? '<1' : rounded} min read`
}

export async function generateStaticParams(): Promise<Array<PostParams>> {
  return getPosts().map(post => ({ slug: post.metadata.slug }))
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPosts().find(post => post.metadata.slug === slug)
  if (!post) return {}

  const { title, description, uploaded, updated, delist } = post.metadata
  return {
    title,
    description,
    alternates: { canonical: `/posts/${slug}` },
    // Delisted posts stay reachable by direct link but out of search results.
    ...(delist ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/posts/${slug}`),
      type: 'article',
      publishedTime: new Date(uploaded).toISOString(),
      modifiedTime: new Date(updated || uploaded).toISOString(),
      images: [
        {
          url: ogImageUrl(title),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl(title, { twitter: true })],
    },
  }
}

function Divider() {
  return <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white mt-4' />
}

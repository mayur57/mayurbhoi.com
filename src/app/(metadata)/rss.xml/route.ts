import { getListedPosts } from 'src/processor/posts'
import {
  absoluteUrl,
  SITE_AUTHOR_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from 'src/utils/site'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getListedPosts()
  const items = posts
    .map(post => {
      const url = absoluteUrl(`/posts/${post.metadata.slug}`)
      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.metadata.description)}</description>
      <category>${escapeXml(post.metadata.tag)}</category>
      <pubDate>${new Date(post.metadata.uploaded).toUTCString()}</pubDate>
    </item>`
    })
    .join('\n')

  const lastBuildDate = new Date(posts[0]?.metadata.uploaded ?? Date.now()).toUTCString()

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <managingEditor>${SITE_AUTHOR_EMAIL} (${SITE_NAME})</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}

import { MetadataRoute } from 'next'
import { getListedPosts } from 'src/processor/posts'
import { absoluteUrl } from 'src/utils/site'

// /reading and /stats are intentionally absent; robots.txt disallows both.
const ROUTES = ['/', '/posts', '/loml', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ROUTES.map(route => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
  }))

  // Only listed posts: a delisted post should stay out of search indexes too.
  const posts = getListedPosts().map(post => ({
    url: absoluteUrl(`/posts/${post.metadata.slug}`),
    lastModified: new Date(post.metadata.updated || post.metadata.uploaded),
  }))

  return [...routes, ...posts]
}

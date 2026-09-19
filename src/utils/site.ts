// Single source of truth for the canonical origin. Everything that emits an
// absolute URL — metadata, OG images, sitemap, robots, feeds — reads from here
// so the apex and www variants can never drift apart again.
export const SITE_URL = 'https://mayurbhoi.com'

export const SITE_NAME = 'Mayur Bhoi'
export const SITE_DESCRIPTION =
  'Blog by Mayur Bhoi on software development and other interesting things.'
export const SITE_AUTHOR_EMAIL = 'me@mayurbhoi.com'

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const ogImageUrl = (title: string, options?: { section?: boolean; twitter?: boolean }) => {
  const params = new URLSearchParams({ title })
  if (options?.section) params.set('section', 'true')
  if (options?.twitter) params.set('twitter', 'true')
  return `${SITE_URL}/og?${params.toString()}`
}

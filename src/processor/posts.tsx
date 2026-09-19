import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import readingTime from 'reading-time'

export type PostMetadata = {
  title: string
  description: string
  slug: string
  uploaded: string
  updated: string
  tag: string
  delist: boolean
  draft: boolean
  substack?: string
}

export type Post = {
  metadata: PostMetadata
  content: string
  readingMinutes: number
}

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const REQUIRED_FIELDS = ['title', 'description', 'slug', 'uploaded', 'tag'] as const
const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---/

// Flags are opt-in: present means true unless explicitly negated.
function parseFlag(value: string | undefined) {
  if (value === undefined) return false
  return !['false', 'no', '0'].includes(value.toLowerCase())
}

// Frontmatter values are untyped text, so every field is checked here rather than
// surfacing as `undefined` deep inside metadata or OG image URLs.
function parseFrontmatter(fileContent: string, file: string) {
  const match = FRONTMATTER_REGEX.exec(fileContent)
  if (!match?.[1]) throw new Error(`${file}: missing or malformed frontmatter block`)

  const fields: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const separator = line.indexOf(':')
    if (separator === -1)
      throw new Error(`${file}: frontmatter line is not "key: value" — "${line}"`)
    const key = line.slice(0, separator).trim()
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"](.*)['"]$/, '$1')
    fields[key] = value
  }

  const missing = REQUIRED_FIELDS.filter(field => !fields[field])
  if (missing.length)
    throw new Error(`${file}: missing frontmatter field(s): ${missing.join(', ')}`)

  // A post that has never been revised is simply current as of its upload date.
  if (!fields['updated']) fields['updated'] = fields['uploaded'] as string

  for (const field of ['uploaded', 'updated'] as const) {
    if (Number.isNaN(new Date(fields[field] as string).getTime())) {
      throw new Error(`${file}: "${field}" is not a valid date — "${fields[field]}"`)
    }
  }

  const metadata: PostMetadata = {
    title: fields['title'] as string,
    description: fields['description'] as string,
    slug: fields['slug'] as string,
    uploaded: fields['uploaded'] as string,
    updated: fields['updated'] as string,
    tag: fields['tag'] as string,
    delist: parseFlag(fields['delist']),
    draft: parseFlag(fields['draft']) || file.includes('.draft.'),
  }
  if (fields['substack']) metadata.substack = fields['substack']

  return { metadata, content: fileContent.slice(match[0].length).trim() }
}

// Reading time is measured on prose only; JSX blocks, code fences and import
// statements otherwise inflate the count on component-heavy posts.
function prose(content: string) {
  return content
    .replace(/^import\s.+$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
}

function readPosts(): Array<Post> {
  const files = fs.readdirSync(POSTS_DIR).filter(file => path.extname(file) === '.mdx')
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
    const { metadata, content } = parseFrontmatter(raw, file)
    return { metadata, content, readingMinutes: readingTime(prose(content)).minutes }
  })

  const duplicate = posts.find(
    (post, index) => posts.findIndex(p => p.metadata.slug === post.metadata.slug) !== index
  )
  if (duplicate) throw new Error(`Duplicate post slug: "${duplicate.metadata.slug}"`)

  return posts
}

// Drafts are readable while writing them locally but never reach production.
const isDev = process.env.NODE_ENV === 'development'

export const getPosts = cache((): Array<Post> => {
  return readPosts().filter(post => isDev || !post.metadata.draft)
})

// Posts fit for public indexes: the homepage, /posts, the sitemap and the feed.
// Delisted posts stay reachable by direct link only.
export const getListedPosts = cache((): Array<Post> => {
  return getPosts()
    .filter(post => !post.metadata.delist)
    .sort(
      (a, b) => new Date(b.metadata.uploaded).getTime() - new Date(a.metadata.uploaded).getTime()
    )
})

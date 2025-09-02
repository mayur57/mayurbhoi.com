import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  description: string
  slug: string
  uploaded: string
  tag: string
  updated: string
  delist?: boolean | string
  substack?: boolean | string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock?.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines?.forEach(line => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key?.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: any) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: any) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function extractTweetIds(content: any) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
  return tweetMatches?.map((tweet: any) => tweet.match(/[0-9]+/g)[0]) || []
}

function getMDXData(dir: any) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const tweetIds = extractTweetIds(content)
    return {
      metadata,
      tweetIds,
      content,
    }
  })
}

export function getPosts() {
  return getMDXData(path.join(process.cwd(), 'content/posts'))
}

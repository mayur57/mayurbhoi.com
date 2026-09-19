'use client'

import { useMemo, useState } from 'react'
import type { PostMetadata } from 'src/processor/posts'

import PostTile from './post'

const ALL = 'all'

export default function PostList({ posts }: { posts: Array<PostMetadata> }) {
  const [tag, setTag] = useState(ALL)

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const post of posts) counts.set(post.tag, (counts.get(post.tag) ?? 0) + 1)
    return [ALL, ...[...counts.keys()].sort()]
  }, [posts])

  const filtered = tag === ALL ? posts : posts.filter(post => post.tag === tag)

  return (
    <div className='pt-4 pb-24'>
      {tags.length > 2 && (
        <div
          className='flex flex-row flex-wrap gap-x-4 gap-y-1 pt-2 pb-2'
          role='group'
          aria-label='Filter posts by tag'>
          {tags.map(name => {
            const active = name === tag
            return (
              <button
                key={name}
                type='button'
                onClick={() => setTag(name)}
                aria-pressed={active}
                className={`text-xs tracking-tight transition-opacity duration-200 cursor-pointer uppercase tracking-wider ${
                  active
                    ? 'opacity-100 underline decoration-from-font underline-offset-4'
                    : 'opacity-40 hover:opacity-70'
                }`}>
                {name}
              </button>
            )
          })}
        </div>
      )}

      <div className='pt-4 animate-fade-up'>
        {filtered.map(post => (
          <PostTile key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

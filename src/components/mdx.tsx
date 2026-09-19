import React, { type ComponentProps, type ReactNode } from 'react'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import { RoundedImage } from './image'
import { TweetComponent } from './tweet'

import 'src/app/marker.css'

import Callout from './callout'
import Code from './code'
import Quote from './quote'

type TableData = {
  headers: Array<string>
  rows: Array<Array<string>>
}

function Table({ data }: { data: TableData }) {
  return (
    <div className='flex items-center justify-center'>
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CustomLink({ href = '', children, className, ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  const external = !href.startsWith('#')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}>
      {children}
    </a>
  )
}

function Emphasis({ children }: ComponentProps<'em'>) {
  return <em className='font-serif text-lg'>{children}</em>
}

function slugify(children: ReactNode) {
  return React.Children.toArray(children)
    .join('')
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replace(/--+/g, '-') // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
          'aria-label': 'Link to this section',
        }),
      ],
      children
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

function Divider() {
  return <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white my-8' />
}

function Strong({ children }: ComponentProps<'strong'>) {
  return <strong className='font-bold'>{children}</strong>
}

function InlineCode({ children }: ComponentProps<'code'>) {
  return (
    <code className='px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-sm'>
      {children}
    </code>
  )
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  em: Emphasis,
  hr: Divider,
  strong: Strong,
  code: InlineCode,
  Image: RoundedImage,
  a: CustomLink,
  pre: Code,
  Tweet: TweetComponent,
  Callout,
  Table,
  Quote,
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeKatex],
  },
}

type MDXProps = {
  source: string
  className?: string
  components?: Record<string, React.ComponentType<never>>
}

export function MDX({ source, className, components: overrides }: MDXProps) {
  return (
    <div className={className}>
      <MDXRemote source={source} components={{ ...components, ...overrides }} options={options} />
    </div>
  )
}

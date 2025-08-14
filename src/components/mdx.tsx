import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import { TweetComponent } from './tweet'

import 'src/app/marker.css'

import Callout from './callout'
import Code from './code'

function Table({ data }: any) {
  const headers = data.headers.map((header: any, index: any) => <th key={index}>{header}</th>)
  const rows = data.rows.map((row: any, index: number) => (
    <tr key={index}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className='flex items-center justify-center'>
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink(props: any) {
  const href = props.href
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }
  if (href.startsWith('#')) return <a {...props} />
  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

function RoundedImage(props: any) {
  return (
    <div className={`flex flex-col items-center pt-4 ${props.className}`}>
      <Image
        alt={props.alt}
        className='article-img border rounded-xl dark:border-[#222]'
        {...props}
      />
      <p className='opacity-70 text-xs text-center sm:px-16'>{props.alt}</p>
    </div>
  )
}

function emphasis(props: any) {
  return <em className='font-serif text-lg'>{props.children}</em>
}

function slugify(str: any) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  /* eslint-disable-next-line react/display-name */
  return ({ children }: any) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
}

function Divider() {
  return <div className='h-[1px] w-full bg-black opacity-10 dark:bg-white my-8' />
}

function Strong(props: any) {
  return <strong className='font-bold'>{props.children}</strong>
}

function InlineCode(props: any) {
  return (
    <code className='px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-sm'>
      {props.children}
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
  em: emphasis,
  hr: Divider,
  strong: Strong,
  code: InlineCode,
  Image: RoundedImage,
  a: CustomLink,
  pre: Code,
  Tweet: TweetComponent,
  Callout,
  Table,
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeKatex],
  },
}

export function MDX(props: any) {
  return (
    <div className={props.className}>
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
        options={options}
      />
    </div>
  )
}

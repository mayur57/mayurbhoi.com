import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { components } from './mdx'

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeKatex],
  },
}

export function MDXWithMath(props: any) {
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

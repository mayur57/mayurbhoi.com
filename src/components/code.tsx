'use client'

import { useState } from 'react'
import { handleError } from 'src/utils/errorHandler'

export default function Code({ children }: any) {
  const [copied, setCopied] = useState(false)

  const displayLanguage =
    children?.props?.className
      ?.split(' ')
      ?.filter((f: string) => f.includes('language'))[0]
      ?.replace('language-', '') || 'text'

  const extractText = (node: any): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (node?.props?.children) return extractText(node.props.children)
    return ''
  }

  const handleCopy = async () => {
    try {
      const codeContent = extractText(children.props.children)
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      handleError("'Failed to copy text: ', err")
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center text-xs px-3 py-1.5 rounded-t-lg bg-[#f7f7f7] dark:bg-[#37415144] text-gray-500 border border-b-0 border-neutral-200 dark:border-gray-800'>
        <span className='opacity-70'>{displayLanguage}</span>
        <button
          onClick={handleCopy}
          className='flex items-center gap-1 transition-colors cursor-pointer hover:text-black dark:hover:text-gray-200'
          title='Copy code'>
          {copied ? (
            <>
              <svg
                className='w-3 h-3 text-green-500 dark:text-green-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span className='text-green-500 dark:text-green-300'>Copied!</span>
            </>
          ) : (
            <>
              <svg
                className='w-3 h-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className='not-prose text-[12px] sm:text-sm py-3 px-4 border border-neutral-200 dark:border-gray-800 bg-transparent'>
        {children}
      </pre>
    </div>
  )
}

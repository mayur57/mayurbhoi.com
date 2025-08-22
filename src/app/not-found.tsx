import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  return (
    <div className='flex flex-col mx-auto max-w-lg sm:pt-[3rem] px-6 xs:px-0 mt-14'>
      <svg
        width='48'
        height='48'
        viewBox='0 0 270 270'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        href='http://www.w3.org/1999/xlink'
        aria-hidden='true'
        focusable='false'>
        <mask
          id='mask0_216_4'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='270'
          height='270'>
          <rect width='270' height='270' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_216_4)'>
          <rect x='-568' y='-42' width='1595' height='848' fill='url(#pattern0)' />
        </g>
        <defs>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use href='#image0_216_4' transform='matrix(0.005 0 0 0.00940448 0 -0.440448)' />
          </pattern>
          <image
            id='image0_216_4'
            width='200'
            height='200'
            href='data:image/png;base64,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'
          />
        </defs>
      </svg>
      <h2 className='not-prose text-2xl font-medium tracking-tight py-4'>Not Found</h2>
      <p className='opacity-70 text-xs sm:text-sm'>
        What was this page that couldn&apos;t be found? An unfinished design, a half-written blog,
        an abandoned thought, or perhaps a private note to self? A stroll into the unknown for sure.
      </p>
      <Link className='pt-6 text-sm' href='/'>
        {'<- '}
        <span className='underline underline-offset-2 decoration-from-font'>go home</span>
      </Link>
    </div>
  )
}

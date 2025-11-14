import Image, { StaticImageData } from 'next/image'

export const Photo = ({ src }: { src: StaticImageData }) => {
  return (
    <Image
      className='not-prose inline-block z-5 h-24 w-24 mb-4 rounded-xl object-cover saturate-0 contrast-125 border border-[#DADADA] dark:border-[#333] hover:h-48 hover:w-48 hover:saturate-100 hover:contrast-100 hover:rounded-3xl duration-500 ease-[cubic-bezier(.4,0,.2,1)]'
      priority
      src={src}
      sizes='(max-width: 768px) 213px, 33vw'
      alt='Me in life jacket in a small dinghy at Yelagiri, Tamil Nadu; on a vacation.'
      placeholder='blur'
      style={{ willChange: 'transform, filter, width, height, border-radius' }}
    />
  )
}

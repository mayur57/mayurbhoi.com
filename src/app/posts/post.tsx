import Link from 'next/link'
import { format } from 'date-fns'

const PostTile = ({ post }: { post: any; index: number }) => (
  <Link href={`/posts/${post.slug}`} className='block min-w-0'>
    <div className='px-5 py-2 -mx-5 rounded-lg cursor-pointer hover:scale-[0.97] hover:bg-[#EAECEE] dark:hover:bg-[#2A2A2A] transition-all duration-300'>
      <div className='grid w-full min-w-0 grid-cols-[minmax(0,max-content)_minmax(1rem,1fr)_auto] items-center gap-x-2'>
        <p className='truncate font-medium text-md tracking-tight opacity-75'>{post.title}</p>
        <div className='h-[1px] dark:bg-[#BBB] bg-[#333] opacity-[0.15]' />
        <p className='nums tracking-tighter text-xs opacity-50'>
          {format(new Date(post.uploaded), 'yyyyMMdd')}
        </p>
      </div>
    </div>
  </Link>
)

export default PostTile

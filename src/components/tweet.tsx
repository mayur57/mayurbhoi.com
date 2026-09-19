import { Suspense } from 'react'
import { EmbeddedTweet, TweetNotFound, TweetSkeleton, type TweetProps } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

const TweetContent = async ({ id, components, onError }: TweetProps) => {
  let error: unknown
  const tweet = id
    ? await getTweet(id).catch((err: unknown) => {
        if (onError) {
          error = onError(err)
        } else {
          console.error(err)
          error = err
        }
      })
    : undefined
  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound error={error} />
  }

  return <EmbeddedTweet tweet={tweet} {...(components ? { components } : {})} />
}

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />

export async function TweetComponent({ id, caption }: { id: string; caption: string }) {
  return (
    <div className='tweet my-6'>
      <div className={`flex flex-col items-center`}>
        <Suspense fallback={<TweetSkeleton />}>
          <ReactTweet id={id} />
          <p className='not-prose opacity-70 text-xs text-center sm:px-16'>{caption}</p>
        </Suspense>
      </div>
    </div>
  )
}

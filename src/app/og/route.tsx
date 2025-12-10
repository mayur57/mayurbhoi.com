import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<any> {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const twitter = searchParams.get('twitter')
  const isForTwitter = twitter !== null
  const imageUrl = isForTwitter
    ? 'https://www.mayurbhoi.com/images/og-t.png'
    : 'https://www.mayurbhoi.com/images/og.png'
  const font = fetch(
    new URL(
      './../../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff',
      import.meta.url
    )
  ).then(res => res.arrayBuffer())
  const fontData = await font

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          paddingLeft: isForTwitter ? '3rem' : '4.5rem',
          paddingTop: isForTwitter ? '3rem' : '4.5rem',
          color: '#423939',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          fontFamily: 'Inter',
          backgroundImage: `url(${imageUrl})`,
        }}>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            letterSpacing: '-0.07em',
            paddingBottom: '1rem',
            fontStyle: 'normal',
            lineHeight: '100px',
            whiteSpace: 'pre-wrap',
            maxWidth: '789px',
            maxHeight: '420px',
            fontWeight: '500',
            overflow: 'hidden',
          }}>
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}

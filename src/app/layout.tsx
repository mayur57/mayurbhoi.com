import './globals.css'

import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font'
import { Toaster } from 'sonner'
import BlurHeader from 'src/components/blur-header'
import { Providers } from 'src/utils/providers'

const inter = localFont({
  src: './fonts/Inter-Variable.ttf',
  display: 'swap',
  weight: '400 600',
  variable: '--font-inter-var',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mayurbhoi.com'),
  title: {
    default: 'Mayur Bhoi',
    template: '%s • Mayur Bhoi',
  },
  description: 'Full-stack developer; doing what I love.',
  openGraph: {
    title: 'Mayur Bhoi',
    description: 'Full-stack developer; doing what I love.',
    url: 'https://mayurbhoi.com',
    siteName: 'Mayur Bhoi',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Mayur Bhoi',
    card: 'summary_large_image',
  },
  verification: {
    google: 'GsV_3_triVwZXNnffPNiN2nGANIvZVbi97EbnbTJ29s',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`font-features-all ${inter.variable} ${newsreader.variable} ${GeistMono.variable}`}>
      <body className={`w-full bg-white dark:bg-[#18181A] transition-all duration-300 antialiased`}>
        <BlurHeader />
        <Providers>
          <Analytics mode={'production'} />
          <SpeedInsights />
          <Toaster richColors />
          <main className='max-w-7xl relative min-w-full scroll-smooth'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

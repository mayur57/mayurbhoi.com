import { Metadata } from 'next'
import Link from 'next/link'
import me from 'public/me.webp'
import MainLayout from 'src/components/main-layout'
import SpotifyWidget from 'src/components/now-playing'
import { Photo } from 'src/components/photo'
import { LocalTime } from 'src/components/time'
import { Venn } from 'src/components/venn'
import { LastVisitor } from 'src/components/visitor'
import { getPosts } from 'src/processor/posts'
import { stagger } from 'src/utils/functions'

type FeaturedProject = {
  title: string
  description: string
  repo: string
}

export const metadata: Metadata = {}

const featuredProjects: Array<FeaturedProject> = [
  {
    title: 'Twitter Nuke',
    description: 'Tool to bulk delete tweets using Twitter Archive',
    repo: 'https://github.com/Mayur57/twitter-nuke',
  },
  {
    title: 'Reflect',
    description: 'A safe space for people to look back at their year',
    repo: 'https://reflectly.vercel.app?ref=mayurbhoi.com',
  },
]

const workingOn: Array<FeaturedProject> = [
  {
    title: 'Vertex',
    description: 'Fast URL shortening service with intelligent tracking',
    repo: 'https://www.vrx.li/waitlist',
  },
  {
    title: 'statsd',
    description: 'Real-time server metrics streaming daemon',
    repo: 'https://github.com/Mayur57/statsd',
  },
]

const featuredPosts = getPosts()
  .filter(post => post.metadata.delist === undefined)
  .sort((a, b) => {
    return new Date(a.metadata.uploaded) > new Date(b.metadata.uploaded) ? -1 : 1
  })
  .slice(0, 2)

export default function Home() {
  return (
    <MainLayout>
      <div className='sm:prose dark:prose-invert prose prose-sm -mt-4 sm:mt-0 perspective-[1000px]'>
        <div>
          <div className={`${stagger(1)} w-full flex justify-start items-center pb-4`}>
            <Photo src={me} />
          </div>

          <div className={`${stagger(2)} not-prose`}>
            <strong className='chroma-text tracking-tight flex flex-row items-center'>
              Mayur Bhoi
              <span
                className='h-[0.9rem] w-[0.9rem] ml-1'
                title='got verified for free; checkmate elon.'>
                <svg viewBox='0 0 24 24' role='img' fill='#1D9BF0' data-testid='icon-verified'>
                  <g>
                    <path d='M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z' />
                  </g>
                </svg>
              </span>
            </strong>
            <p className='tracking-tight -mt-1 opacity-70'>Full Stack Developer</p>
          </div>

          <div className={`${stagger(3)} pt-2`}>
            <p className='chroma-text'>
              Writing impactful & elegant software. Relentlessly devoted to intricacy, efficiency,
              and detailed polish. Unsatisfiably curious about magical design and high performance
              systems.
            </p>
          </div>

          <div className={`${stagger(4)} pt-4`}>
            <p className='chroma-text'>
              Based in{' '}
              <a href='https://www.google.com/maps/place/Bengaluru,+Karnataka'>Bengaluru, India</a>,
              I have been working as Software Engineer at{' '}
              <a href='https://candescent.com'>Candescent</a>.
            </p>
          </div>

          <div
            className={`${stagger(
              5
            )} flex no-scrollbar overflow-x-scroll gap-2 py-8 xs:[mask-image:linear-gradient(to_right,#000_0,#000_100%)] [mask-image:linear-gradient(to_right,#000_0,#000_75%,transparent_100%)]`}>
            <div className='w-[210px] sm:w-[250px] shrink-0 pr-10 sm:m-0'>
              <p className='opacity-60 text-sm font-medium tracking-tight'>Building</p>
              <div className='flex flex-col gap-6'>
                {workingOn?.map((project, index) => (
                  <div key={index} className='pr-4'>
                    <a
                      target='_blank'
                      href={project.repo}
                      className='underline decoration-from-font underline-offset-2 tracking-tight'>
                      {project.title}
                    </a>
                    <p
                      id='desc'
                      className='mt-1 opacity-60 not-prose leading-[0.7] text-xs sm:text-sm'>
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-[210px] sm:w-[250px] shrink-0 pr-10'>
              <p className='opacity-60 text-sm font-medium tracking-tight'>Projects</p>
              <div className='flex flex-col gap-6'>
                {featuredProjects?.map((project, index) => (
                  <div key={index} className='pr-4'>
                    <a
                      target='_blank'
                      href={project.repo}
                      className='underline decoration-from-font underline-offset-2 tracking-tight'>
                      {project.title}
                    </a>
                    <p
                      id='desc'
                      className='mt-1 opacity-60 not-prose leading-[0.7] text-xs sm:text-sm'>
                      {project.description}
                    </p>
                  </div>
                ))}
                <a
                  href='https://github.com/mayur57'
                  className='opacity-60 text-sm font-light tracking-tight'>
                  All projects &#8594;
                </a>
              </div>
            </div>
            <div className='w-[210px] sm:w-[250px] shrink-0 pr-10 mr-12'>
              <p className='opacity-60 text-sm font-medium tracking-tight'>Writing</p>
              <div className='flex flex-col gap-6'>
                {featuredPosts?.map((post, index) => (
                  <div key={index} className='pr-4'>
                    <a
                      href={'/posts/' + post.metadata.slug}
                      className='underline decoration-from-font underline-offset-2 tracking-tight'>
                      {post.metadata.title}
                    </a>
                    <p
                      id='desc'
                      className='mt-1 opacity-60 not-prose leading-tight text-xs sm:text-sm'>
                      {post.metadata.description}
                    </p>
                  </div>
                ))}
                <Link href='/posts' className='opacity-60 text-sm font-medium tracking-tight'>
                  All posts &#8594;
                </Link>
              </div>
            </div>
          </div>

          <div className={`${stagger(6)}`}>
            <strong>Now</strong>
            <p className='pb-6'>
              Figuring out how to be the best in the room, trying to improve by iterating and
              perfecting my craft every day—all while keeping in mind the highest quality of work.
            </p>
            <Venn />
            <p className='pt-6'>
              The culmination of these three skills is what I strive for in my work and, in my
              opinion, set me apart from the rest of the crowd.
            </p>
            <p>
              I like to ship fast. I love solving problems and building things. I am obsessed with
              servers, design, performance, typography, and software that makes an impact. I learn
              new things every day to enable me to do what I do better. The web is a blank canvas I
              have only started to paint.
            </p>
            {/* <p className='underline decoration-from-font underline-offset-2'>I am looking for new opportunities!</p> */}
            <SpotifyWidget />
          </div>

          <div className={`${stagger(7)}`}>
            <strong>Connect</strong>
            <p>
              Find me on these sites:{' '}
              <a title='mayur57' href='https://github.com/mayur57'>
                GitHub
              </a>
              ,{' '}
              <a title='@mayurbhoii' href='https://x.com/mayurbhoii'>
                Twitter
              </a>
              ,{' '}
              <a title='Mayur Bhoi on LinkedIn' href='https://linkedin.com/in/mayur-bhoi'>
                LinkedIn
              </a>
              ,{' '}
              <a title='Mayur Bhoi on Peerlist' href='https://peerlist.io/mayurbhoi'>
                Peerlist
              </a>
              ,{' '}
              <a title='Mayur Bhoi on Bluesky' href='https://bsky.app/profile/mayurbhoi.com'>
                Bluesky
              </a>
            </p>
            <div className='mt-4'>
              Reach out at{' '}
              <a title='me@mayurbhoi.com' href='mailto:me@mayurbhoi.com'>
                me@mayurbhoi.com
              </a>
              <LocalTime />
            </div>
            <div className='thin'>
              <LastVisitor />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

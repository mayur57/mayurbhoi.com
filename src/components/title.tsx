// import { Kaisei_Tokumin } from 'next/font/google'

// const kaisei = Kaisei_Tokumin({ subsets: ['latin'], weight: '700', preload: true, display: 'swap' })

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    className={`leading-tight tracking-tighter text-[#281D1A] dark:text-[#EDEDED] text-4xl sm:text-5xl`}>
    {children}
  </h1>
)

export default Title

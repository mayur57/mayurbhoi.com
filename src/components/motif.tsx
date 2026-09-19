export default function Motif({ children }: { children: React.ReactNode }) {
  return (
    <div className='chroma-text not-prose dark:text-white text-center sm:text-sm text-[12px] opacity-70 pointer-events-none select-none uppercase font-mono tracking-widest'>
      {children}
    </div>
  )
}

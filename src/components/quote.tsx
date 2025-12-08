interface QuoteProps {
  attribution?: string
  link?: string
  author?: string
  children: React.ReactNode
}

export default function Quote({ author, link, attribution, children }: QuoteProps) {
  return (
    <div className="not-prose my-14 w-full">
      <div className="relative font-serif text-2xl leading-[0.95] md:text-3xl mb-[26px] [&>p]:inline [&>p]:opacity-[0.9] [&>p]:text-[#21201C] [&>p]:dark:text-[#f9f9f8] [&>p]:tracking-tight [&>p]:font-serif [&>p]:!leading-[1.2] [&>p]:m-0">
        <span
          className="absolute left-[-12px]"
          style={{ fontFamily: 'Georgia', opacity: 0.9 }}>
          “
        </span>
        {children}
        <span
          className="inline ml-0.5"
          style={{ fontFamily: 'Georgia', opacity: 0.9 }}>
          ”
        </span>
      </div>
      {attribution && (
        <a href={link}>
          <p className="text-right text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans">
            —<span className="font-medium dark:text-gray-200">{author}</span>, {attribution}
          </p>
        </a>
      )}
    </div>
  )
}


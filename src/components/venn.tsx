export const Venn = () => (
  <div className='relative h-[13rem]'>
    <div className='group'>
      <p className='absolute -top-4 left-1/2 -translate-x-1/2 text-xs opacity-70 text-[#111] dark:text-[rgb(210,210,210)] group-hover:opacity-90 transition-all duration-500'>
        Pragmatism
      </p>
      <div className='absolute border bg-[rgba(209,213,219,.4)] dark:bg-[rgba(85,85,85,.3)] mx-auto border-gray-500/40 group-hover:border-gray-800/30 dark:group-hover:border-gray-500/50 group-hover:bg-green-400/30 dark:group-hover:bg-green-400/20 transition-all duration-500 rounded-full h-24 w-24 left-1/2 -translate-x-1/2 translate-y-[1.75rem]'></div>
    </div>
    <div className='group'>
      <p className='absolute -bottom-4 left-1/2 translate-x-[calc(-50%+5.5rem)] text-xs opacity-70 text-[#111] dark:text-[rgb(210,210,210)] group-hover:opacity-90 transition-all duration-500'>
        Creativity
      </p>
      <div className='absolute border bg-[rgba(209,213,219,.4)] dark:bg-[rgba(85,85,85,.3)] mx-auto border-gray-500/40 group-hover:border-gray-800/30 dark:group-hover:border-gray-500/50 group-hover:bg-blue-400/20 dark:group-hover:bg-blue-400/20 transition-all duration-500 rounded-full h-24 w-24 left-1/2 translate-x-[-15%] top-14 translate-y-[1.75rem]'></div>
    </div>
    <div className='group'>
      <p className='absolute -bottom-4 right-1/2 translate-x-[calc(-50%-2rem)] text-xs opacity-70 text-[#111] dark:text-[rgb(210,210,210)] group-hover:opacity-90 transition-all duration-500'>
        Execution
      </p>
      <div className='absolute border bg-[rgba(209,213,219,.4)] dark:bg-[rgba(85,85,85,.3)] mx-auto border-gray-500/40 group-hover:border-gray-800/30 dark:group-hover:border-gray-500/50 group-hover:bg-orange-400/30 dark:group-hover:bg-orange-400/20 transition-all duration-500 rounded-full h-24 w-24 left-1/2 translate-x-[-85%] top-14 translate-y-[1.75rem]'></div>
    </div>
  </div>
)

import type { Post } from 'src/processor/posts'

export type PostSuggestions = {
  next: Post | undefined
  previous: Post | undefined
}

// Stagger the element using the given rank for group animations
export const stagger = (rank: number) => `appear stagger-${rank}`

// Capitalise the first letter of the given string
export const capitalised = (str: string | undefined) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

// Get the current time in IST
export const getLocalTime = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
  return formatter.format(new Date()).substring(0, 2) === '24'
    ? '00' + formatter.format(new Date()).substring(2)
    : formatter.format(new Date())
}

export const formatFullDate = (date: Date) => {
  return date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Get formatted date and relative period passed
export function formatDate(dateString: string) {
  const parsedDate = new Date(dateString)
  const currentDate = new Date()
  const timeDiff = currentDate.getTime() - parsedDate.getTime()

  // Calculate relative time
  const getRelativeTimeExpression = (diff: number) => {
    const secondsInYear = 31536000000 // Y
    const secondsInMonth = 2628000000 // M
    const secondsInDay = 86400000 // D

    if (diff < 0) return 'Future'
    if (diff >= secondsInYear) {
      const years = Math.floor(diff / secondsInYear)
      return `${years}y ago`
    } else if (diff >= secondsInMonth) {
      const months = Math.floor(diff / secondsInMonth)
      return `${months}mo ago`
    } else if (diff >= secondsInDay) {
      const days = Math.floor(diff / secondsInDay)
      return `${days}d ago`
    } else {
      return 'Today'
    }
  }

  const fullDate = formatFullDate(parsedDate)
  const relativeTimeExpression = getRelativeTimeExpression(timeDiff)

  return `${fullDate} (${relativeTimeExpression})`
}

// Generate suggestions object for a given post
// Skips delisted posts. Delisted posts should only be available using direct links.
export function generateSuggestions(sortedPosts: Array<Post>, currPost: Post): PostSuggestions {
  const curr = sortedPosts.indexOf(currPost)

  let next = curr + 1
  let prev = curr - 1

  while (sortedPosts[next]?.metadata.delist) next++
  while (sortedPosts[prev]?.metadata.delist) prev--

  return {
    next: sortedPosts[next],
    previous: sortedPosts[prev],
  }
}

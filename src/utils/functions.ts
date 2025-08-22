// Image loading shimmer string generator
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" opacity="0.3"/>
  <rect id="r" width="${w / 3}" height="${h}" fill="url(#g)" opacity="0.4" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="2s" repeatCount="indefinite"  />
</svg>`

// Convert given string to base64
export const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

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
    const secondsInHour = 3600000 // H
    const secondsInMinute = 60000 // m

    if (diff >= secondsInYear) {
      const years = Math.floor(diff / secondsInYear)
      return `${years}y ago`
    } else if (diff >= secondsInMonth) {
      const months = Math.floor(diff / secondsInMonth)
      return `${months}mo ago`
    } else if (diff >= secondsInDay) {
      const days = Math.floor(diff / secondsInDay)
      return `${days}d ago`
    } else if (diff >= secondsInHour) {
      const hours = Math.floor(diff / secondsInHour)
      return `${hours}h ago`
    } else if (diff >= secondsInMinute) {
      const minutes = Math.floor(diff / secondsInMinute)
      return `${minutes}m ago`
    } else {
      return 'Just now'
    }
  }

  const fullDate = formatFullDate(parsedDate)
  const relativeTimeExpression = getRelativeTimeExpression(timeDiff)

  return `${fullDate} (${relativeTimeExpression})`
}

// Custom function to make a string URL safe
export function urlSafe(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
}

// Generate suggestions object for a given post
// Skips delisted posts. Delisted posts should only be available using direct links.
export function generateSuggestions(sortedPosts: any, currPost: any) {
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

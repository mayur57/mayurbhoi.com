import { toast } from 'sonner'

export function handleError(error: unknown) {
  let message = 'An unexpected error occurred.'

  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = String((error as { message: unknown }).message)
  }

  toast.error(message)
  console.error(error)
}

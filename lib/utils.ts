import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getInitials(fullName: string): string {
  const nameParts = fullName.split(' ')

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  return initials
}

export const getErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'An unexpected error occurred'
  }

  return message
}

export function capitalizeFirstLetter(string: string) {
  let cleanedString = string.replace(/_/g, ' ')
  return (
    cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1).toLowerCase()
  )
}
export function formatDate(date: Date) {
  return format(date, 'do MMMM yyyy')
}

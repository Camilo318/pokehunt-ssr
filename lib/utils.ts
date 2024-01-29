import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatId(id: string) {
  if (typeof id !== 'string') {
    throw new Error('id is not a string')
  }
  return id.padStart(3, '0')
}

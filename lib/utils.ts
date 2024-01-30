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

export function getPokemonImage(id: number | string) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
}

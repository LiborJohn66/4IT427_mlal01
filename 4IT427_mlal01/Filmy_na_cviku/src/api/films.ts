import type { Film } from '../types/film.types'

export async function fetchFilms(): Promise<Film[]> {
  const response = await fetch('/films.json')

  if (!response.ok) {
    throw new Error('Filmy se nepodařilo načíst.')
  }

  return response.json() as Promise<Film[]>
}

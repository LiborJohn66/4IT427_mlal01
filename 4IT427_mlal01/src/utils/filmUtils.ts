import type { Film } from '../types/film.types'

export function filterFilmsByTitle(films: Film[], searchTerm: string) {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase()

  if (normalizedSearchTerm === '') {
    return films
  }

  return films.filter((film) =>
    film.title.toLocaleLowerCase().includes(normalizedSearchTerm),
  )
}

export function calculateAverageRating(films: Film[]) {
  if (films.length === 0) {
    return 0
  }

  const ratingTotal = films.reduce((total, film) => total + film.rating, 0)

  return ratingTotal / films.length
}

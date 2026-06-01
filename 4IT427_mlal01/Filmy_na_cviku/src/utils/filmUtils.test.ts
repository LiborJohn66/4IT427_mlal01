import { describe, expect, it } from 'vitest'
import type { Film } from '../types/film.types'
import { calculateAverageRating, filterFilmsByTitle } from './filmUtils'

const films: Film[] = [
  {
    id: 'arrival-2016',
    title: 'Arrival',
    year: 2016,
    genre: 'Sci-fi drama',
    rating: 9,
    watched: true,
  },
  {
    id: 'parasite-2019',
    title: 'Parasite',
    year: 2019,
    genre: 'Thriller',
    rating: 8,
    watched: false,
  },
  {
    id: 'the-prestige-2006',
    title: 'The Prestige',
    year: 2006,
    genre: 'Drama',
    rating: 10,
    watched: true,
  },
]

describe('filterFilmsByTitle', () => {
  it('finds films by a trimmed title fragment regardless of case', () => {
    expect(filterFilmsByTitle(films, '  RIV  ')).toEqual([films[0]])
  })

  it('returns every film for an empty search term', () => {
    expect(filterFilmsByTitle(films, '   ')).toEqual(films)
  })
})

describe('calculateAverageRating', () => {
  it('calculates the average film rating', () => {
    expect(calculateAverageRating(films)).toBe(9)
  })

  it('returns zero for an empty film list', () => {
    expect(calculateAverageRating([])).toBe(0)
  })
})

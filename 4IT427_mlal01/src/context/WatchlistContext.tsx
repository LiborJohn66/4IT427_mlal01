import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { Film } from '../types/film.types'

type NewFilm = Omit<Film, 'id' | 'watched'>

type WatchlistContextValue = {
  films: Film[]
  addFilm: (film: NewFilm) => void
  removeFilm: (id: string) => void
  toggleWatched: (id: string) => void
  markAllAsWatched: () => void
}

const initialFilms: Film[] = [
  {
    id: 'inception-2010',
    title: 'Inception',
    year: 2010,
    genre: 'Sci-fi',
    rating: 9,
    watched: true,
  },
  {
    id: 'eyes-wide-shut-1999',
    title: 'Eyes Wide Shut',
    year: 1999,
    genre: 'Mystery',
    rating: 8,
    watched: true,
  },
  {
    id: 'fight-club-1999',
    title: 'Fight Club',
    year: 1999,
    genre: 'Thriller',
    rating: 10,
    watched: true,
  },
]

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [films, setFilms] = useState(initialFilms)

  const addFilm = (film: NewFilm) => {
    setFilms((currentFilms) => [
      ...currentFilms,
      {
        ...film,
        id: crypto.randomUUID(),
        watched: false,
      },
    ])
  }

  const removeFilm = (id: string) => {
    setFilms((currentFilms) =>
      currentFilms.filter((film) => film.id !== id),
    )
  }

  const toggleWatched = (id: string) => {
    setFilms((currentFilms) =>
      currentFilms.map((film) =>
        film.id === id ? { ...film, watched: !film.watched } : film,
      ),
    )
  }

  const markAllAsWatched = () => {
    setFilms((currentFilms) =>
      currentFilms.map((film) => ({ ...film, watched: true })),
    )
  }

  return (
    <WatchlistContext
      value={{ films, addFilm, removeFilm, toggleWatched, markAllAsWatched }}
    >
      {children}
    </WatchlistContext>
  )
}

// The exercise keeps the context provider and its consumer hook together.
// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist() {
  const watchlist = useContext(WatchlistContext)

  if (watchlist === null) {
    throw new Error('useWatchlist must be used within WatchlistProvider')
  }

  return watchlist
}

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchFilms } from '../api/films'
import type { Film } from '../types/film.types'

type NewFilm = Omit<Film, 'id' | 'watched'>

type WatchlistContextValue = {
  films: Film[]
  addFilm: (film: NewFilm) => void
  removeFilm: (id: string) => void
  toggleWatched: (id: string) => void
  markAllAsWatched: () => void
  isLoadingFilms: boolean
  isFilmsError: boolean
  filmsError: Error | null
  refetchFilms: () => void
}

type FilmChanges = {
  addedFilms: Film[]
  removedFilmIds: string[]
  watchedById: Record<string, boolean>
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [filmChanges, setFilmChanges] = useState<FilmChanges>({
    addedFilms: [],
    removedFilmIds: [],
    watchedById: {},
  })
  const filmsQuery = useQuery({
    queryKey: ['films'],
    queryFn: fetchFilms,
  })
  const films = [...(filmsQuery.data ?? []), ...filmChanges.addedFilms]
    .filter((film) => !filmChanges.removedFilmIds.includes(film.id))
    .map((film) =>
      filmChanges.watchedById[film.id] === undefined
        ? film
        : { ...film, watched: filmChanges.watchedById[film.id] },
    )

  const addFilm = (film: NewFilm) => {
    setFilmChanges((currentChanges) => ({
      ...currentChanges,
      addedFilms: [
        ...currentChanges.addedFilms,
        {
          ...film,
          id: Date.now().toString(),
          watched: false,
        },
      ],
    }))
  }

  const removeFilm = (id: string) => {
    setFilmChanges((currentChanges) => ({
      ...currentChanges,
      addedFilms: currentChanges.addedFilms.filter((film) => film.id !== id),
      removedFilmIds: currentChanges.removedFilmIds.includes(id)
        ? currentChanges.removedFilmIds
        : [...currentChanges.removedFilmIds, id],
    }))
  }

  const toggleWatched = (id: string) => {
    const changedFilm = films.find((film) => film.id === id)

    if (!changedFilm) {
      return
    }

    setFilmChanges((currentChanges) => ({
      ...currentChanges,
      watchedById: {
        ...currentChanges.watchedById,
        [id]: !changedFilm.watched,
      },
    }))
  }

  const markAllAsWatched = () => {
    setFilmChanges((currentChanges) => ({
      ...currentChanges,
      watchedById: {
        ...currentChanges.watchedById,
        ...Object.fromEntries(films.map((film) => [film.id, true])),
      },
    }))
  }

  return (
    <WatchlistContext
      value={{
        films,
        addFilm,
        removeFilm,
        toggleWatched,
        markAllAsWatched,
        isLoadingFilms: filmsQuery.isPending,
        isFilmsError: filmsQuery.isError && !filmsQuery.data,
        filmsError: filmsQuery.error,
        refetchFilms: () => {
          void filmsQuery.refetch()
        },
      }}
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

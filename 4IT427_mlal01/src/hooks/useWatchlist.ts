import { useState } from 'react'

export type WatchlistFilm = {
  title: string
  year: number
  genre: string
  rating: number
  watched: boolean
}

function useWatchlist(initialFilms: WatchlistFilm[]) {
  const [films, setFilms] = useState(initialFilms)

  const toggleWatched = (title: string) => {
    setFilms((currentFilms) =>
      currentFilms.map((film) =>
        film.title === title ? { ...film, watched: !film.watched } : film,
      ),
    )
  }

  const markAllAsWatched = () => {
    setFilms((currentFilms) =>
      currentFilms.map((film) => ({ ...film, watched: true })),
    )
  }

  return { films, toggleWatched, markAllAsWatched }
}

export default useWatchlist

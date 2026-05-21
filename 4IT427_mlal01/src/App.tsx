import { useEffect } from 'react'
import FilmCard from './components/FilmCard'
import useWatchlist, { type WatchlistFilm } from './hooks/useWatchlist'

const initialFilms: WatchlistFilm[] = [
  {
    title: 'Inception',
    year: 2010,
    genre: 'Sci-fi',
    rating: 9,
    watched: true,
  },
  {
    title: 'Eyes Wide Shut',
    year: 1999,
    genre: 'Mystery',
    rating: 8,
    watched: true,
  },
  {
    title: 'Fight Club',
    year: 1999,
    genre: 'Thriller',
    rating: 10,
    watched: true,
  },
]

function App() {
  const { films, toggleWatched, markAllAsWatched } =
    useWatchlist(initialFilms)

  useEffect(() => {
    const watchedCount = films.filter((film) => film.watched).length
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`
  }, [films])

  return (
    <main>
      <h1>Film Watchlist</h1>
      <button type="button" onClick={markAllAsWatched}>
        Označit vše jako zhlédnuté
      </button>
      {films.map((film) => (
        <FilmCard
          key={film.title}
          title={film.title}
          year={film.year}
          genre={film.genre}
          rating={film.rating}
          watched={film.watched}
          onToggleWatched={toggleWatched}
        />
      ))}
    </main>
  )
}

export default App

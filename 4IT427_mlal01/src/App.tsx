/* Stylingová metoda: CSS Modules */
import { useEffect, useState } from 'react'
import AddFilmForm from './components/AddFilmForm'
import FilmCard from './components/FilmCard'
import { useWatchlist } from './context/WatchlistContext'
import styles from './App.module.css'

function App() {
  const { films, removeFilm, toggleWatched, markAllAsWatched } =
    useWatchlist()
  const watchedCount = films.filter((film) => film.watched).length
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`
  }, [films.length, watchedCount])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme)

    return () => {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkTheme])

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Osobní filmový seznam</p>
          <h1>Film Watchlist</h1>
        </div>
        <div className={styles.headerActions}>
          <p className={styles.progress}>
            <strong>{watchedCount}</strong> / {films.length} zhlédnuto
          </p>
          <button
            className={styles.themeButton}
            type="button"
            onClick={() => setIsDarkTheme((currentTheme) => !currentTheme)}
          >
            {isDarkTheme ? 'Světlý motiv' : 'Tmavý motiv'}
          </button>
        </div>
      </header>
      <section className={styles.workspace}>
        <AddFilmForm />
        <section className={styles.collection} aria-label="Filmový watchlist">
          <div className={styles.collectionHeader}>
            <h2>Filmy ve watchlistu</h2>
            <button
              className={styles.markAllButton}
              type="button"
              onClick={markAllAsWatched}
            >
              Označit vše jako zhlédnuté
            </button>
          </div>
          <div className={styles.filmGrid}>
            {films.map((film) => (
              <FilmCard
                key={film.id}
                id={film.id}
                title={film.title}
                year={film.year}
                genre={film.genre}
                rating={film.rating}
                watched={film.watched}
                onToggleWatched={toggleWatched}
                onRemove={removeFilm}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App

import { useEffect } from 'react'
import FilmCard from '../components/FilmCard'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './WatchlistPage.module.css'

function WatchlistPage() {
  const {
    films,
    removeFilm,
    toggleWatched,
    markAllAsWatched,
    isLoadingFilms,
    isFilmsError,
    filmsError,
    refetchFilms,
  } = useWatchlist()
  const watchedCount = films.filter((film) => film.watched).length

  useEffect(() => {
    document.title = `Watchlist (${watchedCount} / ${films.length} zhlédnuto)`
  }, [films.length, watchedCount])

  if (isLoadingFilms) {
    return (
      <section className={styles.statePanel} aria-live="polite">
        <h2>Filmy ve watchlistu</h2>
        <p>Načítám...</p>
      </section>
    )
  }

  if (isFilmsError) {
    return (
      <section className={styles.statePanel} role="alert">
        <h2>Filmy se nepodařilo načíst</h2>
        <p>{filmsError?.message ?? 'Zkuste načtení zopakovat.'}</p>
        <button
          className={styles.retryButton}
          type="button"
          onClick={refetchFilms}
        >
          Načíst znovu
        </button>
      </section>
    )
  }

  return (
    <section className={styles.page} aria-label="Filmový watchlist">
      <div className={styles.pageHeader}>
        <div>
          <h2>Filmy ve watchlistu</h2>
          <p className={styles.progress}>
            <strong>{watchedCount}</strong> / {films.length} zhlédnuto
          </p>
        </div>
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
  )
}

export default WatchlistPage

import { useState, type FormEvent } from 'react'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './AddFilmForm.module.css'

function AddFilmForm() {
  const { addFilm } = useWatchlist()
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    addFilm({
      title,
      year: Number(year),
      genre,
      rating: Number(rating),
    })

    setTitle('')
    setYear('')
    setGenre('')
    setRating('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.heading}>
        <h2>Přidat film</h2>
      </div>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Název</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Například Arrival"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Rok</span>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="2016"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Žánr</span>
          <input
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Sci-fi"
            required
          />
        </label>
        <label className={styles.field}>
          <span>Hodnocení</span>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            placeholder="1 až 10"
            required
          />
        </label>
      </div>
      <button className={styles.submitButton} type="submit">
        Přidat film
      </button>
    </form>
  )
}

export default AddFilmForm

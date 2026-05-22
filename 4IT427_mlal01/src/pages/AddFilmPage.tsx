import { useEffect } from 'react'
import AddFilmForm from '../components/AddFilmForm'
import styles from './AddFilmPage.module.css'

function AddFilmPage() {
  useEffect(() => {
    document.title = 'Přidat film | Film Watchlist'
  }, [])

  return (
    <section className={styles.page} aria-label="Přidání filmu">
      <AddFilmForm />
    </section>
  )
}

export default AddFilmPage

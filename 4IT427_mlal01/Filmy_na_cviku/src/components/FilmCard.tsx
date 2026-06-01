import styles from './FilmCard.module.css'

export type FilmCardProps = {
  id: string
  title: string
  year: number
  genre: string
  rating: number
  watched: boolean
  onToggleWatched: (id: string) => void
  onRemove: (id: string) => void
}

function FilmCard({
  id,
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onRemove,
}: FilmCardProps) {
  const isRatingValid = rating >= 1 && rating <= 10

  return (
    <article className={`${styles.card} ${watched ? styles.watched : ''}`}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.genre}>{genre}</p>
          <h3>{title}</h3>
        </div>
        {watched && <p className={styles.badge}>✓ Zhlédnuto</p>}
      </div>
      <dl className={styles.details}>
        <div>
          <dt>Rok vydání</dt>
          <dd>{year}</dd>
        </div>
        <div>
          <dt>Hodnocení</dt>
          <dd>{isRatingValid ? `${rating}/10` : 'Neplatné'}</dd>
        </div>
      </dl>
      <div className={styles.actions}>
        <button
          className={styles.statusButton}
          type="button"
          onClick={() => onToggleWatched(id)}
        >
          {watched ? 'Vrátit do watchlistu' : 'Označit jako zhlédnuté'}
        </button>
        <button
          className={styles.removeButton}
          type="button"
          onClick={() => onRemove(id)}
        >
          Odebrat
        </button>
      </div>
    </article>
  )
}

export default FilmCard

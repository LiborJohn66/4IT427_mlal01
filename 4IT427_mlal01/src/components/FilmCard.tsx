export type FilmCardProps = {
  title: string
  year: number
  genre: string
  rating: number
  watched: boolean
  onToggleWatched: (title: string) => void
}

function FilmCard({
  title,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
}: FilmCardProps) {
  const isRatingValid = rating >= 1 && rating <= 10

  return (
    <article>
      <h2>{title}</h2>
      {watched === true && <p>✓ Zhlédnuto</p>}
      <p>Rok vydání: {year}</p>
      <p>Žánr: {genre}</p>
      <p>{isRatingValid ? `Hodnocení: ${rating}/10` : 'Neplatné hodnocení'}</p>
      <button type="button" onClick={() => onToggleWatched(title)}>
        Změnit stav zhlédnutí
      </button>
    </article>
  )
}

export default FilmCard

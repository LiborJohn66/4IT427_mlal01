import FilmCard from './components/FilmCard'

const films = [
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
  const handleToggleWatched = (title: string) => {
    console.log(`Změnit stav zhlédnutí: ${title}`)
  }

  return (
    <main>
      <h1>Film Watchlist</h1>
      {films.map((film) => (
        <FilmCard
          key={film.title}
          title={film.title}
          year={film.year}
          genre={film.genre}
          rating={film.rating}
          watched={film.watched}
          onToggleWatched={handleToggleWatched}
        />
      ))}
    </main>
  )
}

export default App

/* Stylingová metoda: CSS Modules */
import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import AddFilmPage from './pages/AddFilmPage'
import WatchlistPage from './pages/WatchlistPage'
import styles from './App.module.css'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

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
        <div className={styles.shellActions}>
          <nav className={styles.navigation} aria-label="Hlavní navigace">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Můj watchlist
            </NavLink>
            <NavLink
              to="/form"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Přidat film
            </NavLink>
          </nav>
          <button
            className={styles.themeButton}
            type="button"
            onClick={() => setIsDarkTheme((currentTheme) => !currentTheme)}
          >
            {isDarkTheme ? 'Světlý motiv' : 'Tmavý motiv'}
          </button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/form" element={<AddFilmPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App

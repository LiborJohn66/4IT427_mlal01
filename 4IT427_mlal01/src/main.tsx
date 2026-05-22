import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WatchlistProvider } from './context/WatchlistContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>,
)

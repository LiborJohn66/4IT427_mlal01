import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-logo">EventMaster</span>
        <Navbar />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

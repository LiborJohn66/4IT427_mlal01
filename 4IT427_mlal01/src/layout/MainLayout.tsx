import { Outlet } from 'react-router-dom'

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-logo">EventMaster</span>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

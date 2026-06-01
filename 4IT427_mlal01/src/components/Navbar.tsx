import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/events', label: 'Events' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/team', label: 'Team' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
          }
          end={item.to === '/'}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

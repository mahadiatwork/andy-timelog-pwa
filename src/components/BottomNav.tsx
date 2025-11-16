import { NavLink, useNavigate } from 'react-router-dom'
import { useTimeLog } from '../context/TimeLogContext'
import './BottomNav.css'

function BottomNav() {
  const navigate = useNavigate()
  const { dispatch } = useTimeLog()

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  }

  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">🏠</div>
        <div className="nav-label">Dashboard</div>
      </NavLink>
      
      <NavLink to="/new-entry" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">➕</div>
        <div className="nav-label">New Entry</div>
      </NavLink>
      
      <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <div className="nav-icon">📊</div>
        <div className="nav-label">Reports</div>
      </NavLink>
      
      <button onClick={handleLogout} className="nav-item">
        <div className="nav-icon">🚪</div>
        <div className="nav-label">Logout</div>
      </button>
    </nav>
  )
}

export default BottomNav

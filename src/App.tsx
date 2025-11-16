import { useState } from 'react'
import Login from './components/Login'
import TimeLog from './components/TimeLog'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  const handleLogin = (username: string) => {
    setCurrentUser(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser('')
  }

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TimeLog username={currentUser} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App

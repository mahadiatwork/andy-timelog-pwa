import { useState, FormEvent } from 'react'
import tidwellLogo from '../assets/tidwell-logo.png'
import './Login.css'

interface LoginProps {
  onLogin: (username: string) => void
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={tidwellLogo} alt="Tidwell Roofing & Sheet Metal" className="login-logo" />
        </div>
        <h1 className="login-title">Time Log Portal</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

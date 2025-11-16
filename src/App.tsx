import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TimeLogProvider, useTimeLog } from './context/TimeLogContext'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import NewEntry from './pages/NewEntry'
import Reports from './pages/Reports'
import BottomNav from './components/BottomNav'
import './App.css'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { state } = useTimeLog()
  
  if (!state.currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}

function LoginPage() {
  const { dispatch } = useTimeLog()
  const { state } = useTimeLog()

  const handleLogin = (username: string) => {
    dispatch({ type: 'SET_USER', payload: username })
  }

  if (state.currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  return <Login onLogin={handleLogin} />
}

function App() {
  return (
    <BrowserRouter>
      <TimeLogProvider>
        <div className="app">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              }
            />
            <Route
              path="/new-entry"
              element={
                <ProtectedLayout>
                  <NewEntry />
                </ProtectedLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedLayout>
                  <Reports />
                </ProtectedLayout>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </TimeLogProvider>
    </BrowserRouter>
  )
}

export default App

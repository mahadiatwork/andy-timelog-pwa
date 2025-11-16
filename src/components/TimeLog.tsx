import { useState, FormEvent } from 'react'
import tidwellLogo from '../assets/tidwell-logo.png'
import './TimeLog.css'

interface TimeLogProps {
  username: string
  onLogout: () => void
}

interface TimeEntry {
  id: number
  job: string
  date: string
  startTime: string
  lunchStart: string
  lunchEnd: string
  endTime: string
  notes: string
  extras: string
  submittedAt: string
}

function TimeLog({ username, onLogout }: TimeLogProps) {
  const [job, setJob] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [startTime, setStartTime] = useState('')
  const [lunchStart, setLunchStart] = useState('')
  const [lunchEnd, setLunchEnd] = useState('')
  const [endTime, setEndTime] = useState('')
  const [notes, setNotes] = useState('')
  const [extras, setExtras] = useState('')
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const jobsInProgress = [
    'Commercial Building - Downtown',
    'Residential Roof Replacement - Oak Street',
    'Sheet Metal Installation - Industrial Park',
    'Roof Repair - Maple Avenue',
    'New Construction - Riverside Development'
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const newEntry: TimeEntry = {
      id: Date.now(),
      job,
      date,
      startTime,
      lunchStart,
      lunchEnd,
      endTime,
      notes,
      extras,
      submittedAt: new Date().toLocaleString()
    }

    setEntries([newEntry, ...entries])
    
    setJob('')
    setStartTime('')
    setLunchStart('')
    setLunchEnd('')
    setEndTime('')
    setNotes('')
    setExtras('')
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="timelog-container">
      <header className="timelog-header">
        <div className="header-content">
          <img src={tidwellLogo} alt="Tidwell Roofing" className="header-logo" />
          <div className="header-info">
            <span className="username-display">Welcome, {username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <main className="timelog-main">
        <div className="form-container">
          <h2 className="form-title">Daily Time Log Entry</h2>
          
          {showSuccess && (
            <div className="success-message">
              ✓ Time entry submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="timelog-form">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="job">Job Selection *</label>
                <select
                  id="job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                >
                  <option value="">Select a job...</option>
                  {jobsInProgress.map((jobName) => (
                    <option key={jobName} value={jobName}>
                      {jobName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="endTime">End Time *</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="lunchStart">Lunch Start</label>
                <input
                  type="time"
                  id="lunchStart"
                  value={lunchStart}
                  onChange={(e) => setLunchStart(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="lunchEnd">Lunch End</label>
                <input
                  type="time"
                  id="lunchEnd"
                  value={lunchEnd}
                  onChange={(e) => setLunchEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Enter any notes about the work performed..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="extras">Extras Outside of Scope</label>
              <textarea
                id="extras"
                value={extras}
                onChange={(e) => setExtras(e.target.value)}
                rows={3}
                placeholder="Describe any extra work performed outside the original scope..."
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Time Entry
            </button>
          </form>
        </div>

        {entries.length > 0 && (
          <div className="entries-container">
            <h3 className="entries-title">Recent Submissions</h3>
            <div className="entries-list">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <strong>{entry.job}</strong>
                    <span className="entry-date">{entry.date}</span>
                  </div>
                  <div className="entry-times">
                    <span>Work: {entry.startTime} - {entry.endTime}</span>
                    {entry.lunchStart && entry.lunchEnd && (
                      <span>Lunch: {entry.lunchStart} - {entry.lunchEnd}</span>
                    )}
                  </div>
                  {entry.notes && (
                    <div className="entry-section">
                      <strong>Notes:</strong> {entry.notes}
                    </div>
                  )}
                  {entry.extras && (
                    <div className="entry-section">
                      <strong>Extras:</strong> {entry.extras}
                    </div>
                  )}
                  <div className="entry-footer">
                    Submitted: {entry.submittedAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default TimeLog

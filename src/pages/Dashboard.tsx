import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimeLog } from '../context/TimeLogContext'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const { getJobSummaries, getRecentEntries } = useTimeLog()
  const [searchTerm, setSearchTerm] = useState('')
  const jobSummaries = getJobSummaries()
  const recentEntries = getRecentEntries(10)
  
  const filteredJobs = jobSummaries.filter(job =>
    job.jobName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <button className="new-entry-button" onClick={() => navigate('/new-entry')}>
        + New Time Entry
      </button>

      <div className="dashboard-content">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search jobs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="recent-jobs-section">
          <h2>Recent Jobs</h2>
          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? (
                <p>No jobs found matching "{searchTerm}"</p>
              ) : (
                <p>No time entries yet. Click "+ New Time Entry" to get started!</p>
              )}
            </div>
          ) : (
            <div className="jobs-list">
              {filteredJobs.map((summary) => (
                <div key={summary.jobId} className="job-card">
                  <div className="job-icon">🏗️</div>
                  <div className="job-info">
                    <h3>{summary.jobName}</h3>
                    <p className="job-meta">Last worked: {new Date(summary.lastWorked).toLocaleDateString()}</p>
                  </div>
                  <div className="job-hours">
                    <span className="hours-badge">{summary.totalHours.toFixed(1)}h</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {recentEntries.length > 0 && (
          <section className="recent-entries-section">
            <h2>Recent Time Entries</h2>
            <div className="entries-list">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <h3>{entry.jobName}</h3>
                    <span className="entry-hours">{entry.totalHours.toFixed(1)}h</span>
                  </div>
                  <div className="entry-details">
                    <span className="entry-employee">👤 {entry.employee}</span>
                    <span className="entry-date">📅 {new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  {entry.notes && (
                    <p className="entry-notes">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard

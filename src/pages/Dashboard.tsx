import { useNavigate } from 'react-router-dom'
import { useTimeLog } from '../context/TimeLogContext'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const { getJobSummaries } = useTimeLog()
  const jobSummaries = getJobSummaries()

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
          <input type="text" placeholder="Search jobs..." />
        </div>

        <section className="recent-jobs-section">
          <h2>Recent Jobs</h2>
          {jobSummaries.length === 0 ? (
            <div className="empty-state">
              <p>No time entries yet. Click "+ New Time Entry" to get started!</p>
            </div>
          ) : (
            <div className="jobs-list">
              {jobSummaries.map((summary) => (
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
      </div>
    </div>
  )
}

export default Dashboard

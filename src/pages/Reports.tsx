import { useState } from 'react'
import { useTimeLog } from '../context/TimeLogContext'
import './Reports.css'

function Reports() {
  const { getTotalHours, getRecentEntries, state } = useTimeLog()
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')
  
  const totalHours = getTotalHours(period)
  const recentEntries = getRecentEntries(20)

  return (
    <div className="reports">
      <header className="reports-header">
        <h1>Reports</h1>
      </header>

      <div className="reports-content">
        <section className="summary-section">
          <h2>📊 Summary</h2>
          
          <div className="period-tabs">
            <button 
              className={period === 'week' ? 'active' : ''} 
              onClick={() => setPeriod('week')}
            >
              This Week
            </button>
            <button 
              className={period === 'month' ? 'active' : ''} 
              onClick={() => setPeriod('month')}
            >
              This Month
            </button>
            <button 
              className={period === 'year' ? 'active' : ''} 
              onClick={() => setPeriod('year')}
            >
              This Year
            </button>
          </div>

          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-label">Total Hours</div>
              <div className="summary-value">{totalHours.toFixed(1)}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Entries</div>
              <div className="summary-value">{state.entries.length}</div>
            </div>
          </div>
        </section>

        <section className="entries-section">
          <h2>Recent Entries</h2>
          {recentEntries.length === 0 ? (
            <div className="empty-state">
              <p>No time entries yet.</p>
            </div>
          ) : (
            <div className="entries-list">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="entry-item">
                  <div className="entry-main">
                    <h3>{entry.jobName}</h3>
                    <p className="entry-meta">{entry.employee} • {new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                  <div className="entry-hours">
                    <span className="hours-value">{entry.totalHours.toFixed(1)}h</span>
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

export default Reports

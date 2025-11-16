import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimeLog } from '../context/TimeLogContext'
import './NewEntry.css'

function NewEntry() {
  const navigate = useNavigate()
  const { state, addEntry } = useTimeLog()
  
  const [formData, setFormData] = useState({
    jobId: '',
    jobName: '',
    employee: state.currentUser,
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    lunchStart: '',
    lunchEnd: '',
    notes: '',
    extras: ''
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateHours = () => {
    if (!formData.startTime || !formData.endTime) return 0
    
    const start = new Date(`2000-01-01T${formData.startTime}`)
    const end = new Date(`2000-01-01T${formData.endTime}`)
    let hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

    if (formData.lunchStart && formData.lunchEnd) {
      const lunchStart = new Date(`2000-01-01T${formData.lunchStart}`)
      const lunchEnd = new Date(`2000-01-01T${formData.lunchEnd}`)
      const lunchHours = (lunchEnd.getTime() - lunchStart.getTime()) / (1000 * 60 * 60)
      hours -= lunchHours
    }

    return Math.max(0, hours)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.jobId || !formData.employee || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields')
      return
    }

    const totalHours = calculateHours()
    addEntry({
      ...formData,
      totalHours
    })
    navigate('/dashboard')
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  return (
    <div className="new-entry-page">
      <div className="page-header">
        <h1>New Time Entry</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Job Details</h2>
            
            <div className="form-group">
              <label htmlFor="job">Job *</label>
              <select
                id="job"
                value={formData.jobId}
                onChange={(e) => {
                  const job = state.jobs.find(j => j.id === e.target.value)
                  setFormData(prev => ({
                    ...prev,
                    jobId: e.target.value,
                    jobName: job?.name || ''
                  }))
                }}
                required
              >
                <option value="">Select a job</option>
                {state.jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employee">Employee *</label>
                <input
                  type="text"
                  id="employee"
                  value={formData.employee}
                  onChange={(e) => updateField('employee', e.target.value)}
                  placeholder="Employee name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Time Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={(e) => updateField('startTime', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endTime">End Time *</label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={(e) => updateField('endTime', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lunchStart">Lunch Start</label>
                <input
                  type="time"
                  id="lunchStart"
                  value={formData.lunchStart}
                  onChange={(e) => updateField('lunchStart', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lunchEnd">Lunch End</label>
                <input
                  type="time"
                  id="lunchEnd"
                  value={formData.lunchEnd}
                  onChange={(e) => updateField('lunchEnd', e.target.value)}
                />
              </div>
            </div>

            {formData.startTime && formData.endTime && (
              <div className="hours-display">
                <span className="hours-label">Total Hours:</span>
                <span className="hours-value">{calculateHours().toFixed(1)} hours</span>
              </div>
            )}
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
                placeholder="Add any notes about the work performed..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="extras">Extras Outside of Scope</label>
              <textarea
                id="extras"
                value={formData.extras}
                onChange={(e) => updateField('extras', e.target.value)}
                rows={3}
                placeholder="Describe any extra work performed..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewEntry

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimeLog } from '../context/TimeLogContext'
import './NewEntry.css'

interface EntryData {
  jobId: string
  jobName: string
  employee: string
  date: string
  startTime: string
  endTime: string
  lunchStart: string
  lunchEnd: string
  notes: string
  extras: string
}

function NewEntry() {
  const navigate = useNavigate()
  const { state, addEntry } = useTimeLog()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<EntryData>({
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

  const updateData = (updates: Partial<EntryData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
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

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    const totalHours = calculateHours()
    addEntry({
      ...formData,
      totalHours
    })
    navigate('/dashboard')
  }

  const canProceed = () => {
    if (step === 1) return formData.jobId !== ''
    if (step === 2) return formData.employee !== '' && formData.date !== ''
    if (step === 3) return formData.startTime !== '' && formData.endTime !== ''
    return true
  }

  return (
    <div className="new-entry">
      <header className="new-entry-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h1>New Time Entry</h1>
      </header>

      <div className="stepper">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`step ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}>
            {s}
          </div>
        ))}
        <div className="stepper-line"></div>
      </div>

      <div className="new-entry-content">
        {step === 1 && (
          <div className="step-content">
            <h2>Select Job</h2>
            <p className="step-description">Choose the job you worked on</p>
            <div className="form-field">
              <label>Job</label>
              <select 
                value={formData.jobId} 
                onChange={(e) => {
                  const job = state.jobs.find(j => j.id === e.target.value)
                  updateData({ 
                    jobId: e.target.value,
                    jobName: job?.name || ''
                  })
                }}
              >
                <option value="">Select a job</option>
                {state.jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Employee & Date</h2>
            <p className="step-description">Who performed this work?</p>
            <div className="form-field">
              <label>Employee</label>
              <input
                type="text"
                value={formData.employee}
                onChange={(e) => updateData({ employee: e.target.value })}
                placeholder="Employee name"
              />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateData({ date: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Time Details</h2>
            <p className="step-description">Enter work hours for this job</p>
            
            <div className="time-row">
              <div className="form-field">
                <label>Start Time *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>End Time *</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateData({ endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="time-row">
              <div className="form-field">
                <label>Lunch Start</label>
                <input
                  type="time"
                  value={formData.lunchStart}
                  onChange={(e) => updateData({ lunchStart: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Lunch End</label>
                <input
                  type="time"
                  value={formData.lunchEnd}
                  onChange={(e) => updateData({ lunchEnd: e.target.value })}
                />
              </div>
            </div>

            {formData.startTime && formData.endTime && (
              <div className="total-hours-display">
                Total Hours: <strong>{calculateHours().toFixed(1)}h</strong>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>Notes & Extras</h2>
            <p className="step-description">Add any additional details</p>
            
            <div className="form-field">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateData({ notes: e.target.value })}
                rows={4}
                placeholder="Enter any notes about the work performed..."
              />
            </div>

            <div className="form-field">
              <label>Extras Outside of Scope</label>
              <textarea
                value={formData.extras}
                onChange={(e) => updateData({ extras: e.target.value })}
                rows={3}
                placeholder="Describe any extra work performed..."
              />
            </div>

            <div className="review-summary">
              <h3>Review Your Entry</h3>
              <div className="review-item">
                <span className="review-label">Job:</span>
                <span className="review-value">{formData.jobName}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Employee:</span>
                <span className="review-value">{formData.employee}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Date:</span>
                <span className="review-value">{new Date(formData.date).toLocaleDateString()}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Hours:</span>
                <span className="review-value">{calculateHours().toFixed(1)}h</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="wizard-actions">
        {step > 1 && (
          <button className="btn-secondary" onClick={handlePrevious}>
            Previous
          </button>
        )}
        {step < 4 ? (
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next
          </button>
        ) : (
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
          >
            Submit Entry
          </button>
        )}
      </div>
    </div>
  )
}

export default NewEntry

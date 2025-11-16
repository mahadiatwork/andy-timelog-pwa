export interface Job {
  id: string
  name: string
  jobNumber: string
  client: string
}

export interface TimeEntry {
  id: string
  jobId: string
  jobName: string
  employee: string
  date: string
  startTime: string
  endTime: string
  lunchStart?: string
  lunchEnd?: string
  notes?: string
  extras?: string
  totalHours: number
  submittedAt: string
}

export interface JobSummary {
  jobId: string
  jobName: string
  totalHours: number
  lastWorked: string
}

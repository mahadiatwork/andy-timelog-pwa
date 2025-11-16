import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { TimeEntry, Job, JobSummary } from '../types'

interface TimeLogState {
  entries: TimeEntry[]
  jobs: Job[]
  currentUser: string
}

type TimeLogAction =
  | { type: 'ADD_ENTRY'; payload: TimeEntry }
  | { type: 'SET_USER'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_STATE'; payload: TimeLogState }

interface TimeLogContextType {
  state: TimeLogState
  dispatch: React.Dispatch<TimeLogAction>
  addEntry: (entry: Omit<TimeEntry, 'id' | 'submittedAt'>) => void
  getRecentEntries: (limit?: number) => TimeEntry[]
  getJobSummaries: () => JobSummary[]
  getTotalHours: (period?: 'week' | 'month' | 'year') => number
}

const TimeLogContext = createContext<TimeLogContextType | undefined>(undefined)

const initialJobs: Job[] = [
  { id: '1', name: 'Commercial Building - Downtown', jobNumber: 'JB-2024-001', client: 'ABC Corporation' },
  { id: '2', name: 'Residential Roof Replacement - Oak Street', jobNumber: 'JB-2024-002', client: 'Smith Residence' },
  { id: '3', name: 'Sheet Metal Installation - Industrial Park', jobNumber: 'JB-2024-003', client: 'XYZ Industries' },
  { id: '4', name: 'Roof Repair - Maple Avenue', jobNumber: 'JB-2024-004', client: 'Johnson Property' },
  { id: '5', name: 'New Construction - Riverside Development', jobNumber: 'JB-2024-005', client: 'Riverside LLC' }
]

const initialState: TimeLogState = {
  entries: [],
  jobs: initialJobs,
  currentUser: ''
}

function timeLogReducer(state: TimeLogState, action: TimeLogAction): TimeLogState {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [action.payload, ...state.entries]
      }
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        currentUser: ''
      }
    case 'LOAD_STATE':
      return action.payload
    default:
      return state
  }
}

export function TimeLogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timeLogReducer, initialState)

  useEffect(() => {
    const saved = localStorage.getItem('tidwell-timelog-state')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'LOAD_STATE', payload: { ...parsed, jobs: initialJobs } })
      } catch (e) {
        console.error('Failed to load saved state')
      }
    }
  }, [])

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('tidwell-timelog-state', JSON.stringify(state))
    }
  }, [state])

  const addEntry = (entry: Omit<TimeEntry, 'id' | 'submittedAt'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_ENTRY', payload: newEntry })
  }

  const getRecentEntries = (limit: number = 10): TimeEntry[] => {
    return state.entries.slice(0, limit)
  }

  const getJobSummaries = (): JobSummary[] => {
    const summaries = new Map<string, JobSummary>()
    
    state.entries.forEach(entry => {
      const existing = summaries.get(entry.jobId)
      if (existing) {
        existing.totalHours += entry.totalHours
        if (new Date(entry.date) > new Date(existing.lastWorked)) {
          existing.lastWorked = entry.date
        }
      } else {
        summaries.set(entry.jobId, {
          jobId: entry.jobId,
          jobName: entry.jobName,
          totalHours: entry.totalHours,
          lastWorked: entry.date
        })
      }
    })

    return Array.from(summaries.values()).sort((a, b) => 
      new Date(b.lastWorked).getTime() - new Date(a.lastWorked).getTime()
    )
  }

  const getTotalHours = (period?: 'week' | 'month' | 'year'): number => {
    const now = new Date()
    let filtered = state.entries

    if (period) {
      const cutoff = new Date()
      if (period === 'week') {
        cutoff.setDate(now.getDate() - 7)
      } else if (period === 'month') {
        cutoff.setMonth(now.getMonth() - 1)
      } else if (period === 'year') {
        cutoff.setFullYear(now.getFullYear() - 1)
      }
      filtered = state.entries.filter(e => new Date(e.date) >= cutoff)
    }

    return filtered.reduce((sum, entry) => sum + entry.totalHours, 0)
  }

  const value: TimeLogContextType = {
    state,
    dispatch,
    addEntry,
    getRecentEntries,
    getJobSummaries,
    getTotalHours
  }

  return <TimeLogContext.Provider value={value}>{children}</TimeLogContext.Provider>
}

export function useTimeLog() {
  const context = useContext(TimeLogContext)
  if (!context) {
    throw new Error('useTimeLog must be used within TimeLogProvider')
  }
  return context
}

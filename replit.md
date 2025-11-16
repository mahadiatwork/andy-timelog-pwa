# Tidwell Roofing Time Log PWA

## Overview
A Progressive Web App (PWA) time logging portal for Tidwell Roofing & Sheet Metal employees to track their daily work hours across various job sites.

## Project Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **PWA Support**: vite-plugin-pwa with workbox
- **Styling**: Custom CSS matching Tidwell brand colors
- **Deployment**: Replit Autoscale

## Brand Colors
- **Primary Blue**: #2E5A8E (used in headers, titles, accents)
- **Primary Red**: #D62027 (used in buttons, highlights)
- **Background**: Light gray gradients

## Features
1. **Login Screen**
   - Displays Tidwell logo prominently
   - Username/password authentication with validation
   - Branded blue gradient background

2. **Dashboard**
   - "New Time Entry" button for quick access
   - Search box for finding jobs
   - Recent Jobs section showing total hours per job
   - Recent Time Entries section showing individual logs with employee, date, and notes
   - Visual cards with Tidwell-branded colors

3. **Single-Page Time Entry Form**
   - All fields visible on one clean page
   - Organized into sections: Job Details, Time Details, Additional Information
   - Select Job, Employee, Date fields
   - Time entry with Start/End/Lunch times
   - Automatic hours calculation (including lunch deduction)
   - Notes and Extras fields
   - Cancel and Submit buttons with Tidwell branding

4. **Reports Page**
   - Summary statistics with period filters (This Week/Month/Year)
   - Total hours and entry count display
   - Recent Entries list with job names, employees, and dates
   - Visual cards and badges

5. **Bottom Navigation**
   - Dashboard, New Entry, Reports, and Logout options
   - Active state highlighting
   - Fixed position for easy access
   - Properly spaced to avoid content overlap

6. **Progressive Web App**
   - Installable on mobile devices
   - Offline capability with service worker
   - localStorage persistence for data
   - App-like experience

## Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── Login.tsx          - Login screen component
│   │   ├── Login.css          - Login screen styles
│   │   ├── BottomNav.tsx      - Bottom navigation bar
│   │   └── BottomNav.css      - Navigation styles
│   ├── pages/
│   │   ├── Dashboard.tsx      - Dashboard with recent jobs
│   │   ├── Dashboard.css      - Dashboard styles
│   │   ├── NewEntry.tsx       - Multi-step time entry wizard
│   │   ├── NewEntry.css       - Wizard styles
│   │   ├── Reports.tsx        - Reports and statistics
│   │   └── Reports.css        - Reports styles
│   ├── context/
│   │   └── TimeLogContext.tsx - Global state management with reducer
│   ├── assets/
│   │   └── tidwell-logo.png   - Company logo
│   ├── types.ts               - TypeScript type definitions
│   ├── App.tsx                - Main app with routing
│   ├── App.css                - Global app styles
│   ├── main.tsx               - Entry point
│   └── index.css              - Global CSS reset
├── index.html                 - HTML template
├── vite.config.ts             - Vite configuration with PWA
└── package.json               - Dependencies and scripts
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Demo Credentials
For testing purposes, use any of these credentials to login:
- Username: `tidwell` / Password: `roofing`
- Username: `admin` / Password: `password`
- Username: `employee` / Password: `demo1234`

## Recent Changes
- **November 16, 2025**: Complete application redesign with single-page time entry
  - Implemented React Router for multi-page navigation
  - Created TimeLogContext with useReducer for state management
  - Added localStorage persistence to save entries across sessions
  - Built Dashboard page showing recent jobs summaries and individual time entries
  - Created single-page time entry form with clean, organized layout (replaced multi-step wizard)
  - Built Reports page with period filters and statistics
  - Implemented bottom navigation for easy page switching
  - Fixed bottom navigation alignment issues
  - Added credential validation to login (demo credentials: tidwell/roofing, admin/password, employee/demo1234)
  - Styled all pages to match Tidwell brand (blue #2E5A8E, red #D62027)
  - Configured PWA manifest and service worker
  - Set up deployment configuration for Replit Autoscale

## Technical Details
- **State Management**: React Context with useReducer pattern
- **Data Persistence**: localStorage for client-side data storage
- **Routing**: React Router v6 with protected routes
- **Hours Calculation**: Automatic calculation of work hours with lunch deduction
- **Navigation**: Bottom nav with active state highlighting

## Notes
- The app uses localStorage to persist entries across page refreshes
- Entries are stored in the browser's localStorage (client-side only)
- For production use, consider adding:
  - Backend API for centralized data storage
  - Real authentication system (JWT, OAuth)
  - Database integration (PostgreSQL, MongoDB)
  - User role management and permissions
  - Data export features (CSV, PDF reports)
  - Employee management system

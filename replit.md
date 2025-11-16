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
   - Simple username/password authentication
   - Branded blue gradient background

2. **Time Logging Portal**
   - Job selection from active projects
   - Date picker (defaults to today)
   - Time entry fields:
     - Start Time
     - End Time
     - Lunch Start (optional)
     - Lunch End (optional)
   - Notes field for work details
   - Extras Outside of Scope field for additional work
   - Recent submissions display

3. **Progressive Web App**
   - Installable on mobile devices
   - Offline capability
   - App-like experience

## Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── Login.tsx          - Login screen component
│   │   ├── Login.css          - Login screen styles
│   │   ├── TimeLog.tsx        - Time logging component
│   │   └── TimeLog.css        - Time log styles
│   ├── assets/
│   │   └── tidwell-logo.png   - Company logo
│   ├── App.tsx                - Main app component
│   ├── App.css                - Global app styles
│   ├── main.tsx               - Entry point
│   └── index.css              - Global CSS reset
├── index.html                 - HTML template
├── vite.config.ts             - Vite configuration
└── package.json               - Dependencies and scripts
```

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Recent Changes
- **November 16, 2025**: Initial project setup
  - Created React + TypeScript PWA with Vite
  - Implemented login screen with Tidwell branding
  - Built time logging portal with all required fields
  - Configured PWA manifest and service worker
  - Set up deployment configuration

## Notes
- The app uses in-memory state management (entries are lost on page refresh)
- For production use, consider adding:
  - Backend API for data persistence
  - Real authentication system
  - Database integration
  - User role management

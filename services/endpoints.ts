/**
 * API Endpoints Configuration
 * Centralized list of all API endpoints used in the application
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const endpoints = {
  // Timesheets
  timesheets: {
    list: `${API_BASE_URL}/timesheets`,
    detail: (id: string) => `${API_BASE_URL}/timesheets/${id}`,
    week: `${API_BASE_URL}/timesheets/week`,
  },
  
  // Time Entries
  timeEntries: {
    create: `${API_BASE_URL}/time-entries`,
    update: (id: string) => `${API_BASE_URL}/time-entries/${id}`,
    delete: (id: string) => `${API_BASE_URL}/time-entries/${id}`,
  },
  
  // Projects
  projects: {
    list: `${API_BASE_URL}/projects`,
  },
} as const;

/**
 * Timesheet Type Definitions
 */

import { Status } from '@/utils/constants';

// Time Entry (individual task entry)
export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  projectName: string;
  taskName: string;
  description?: string;
  date: string; // ISO date: "2024-01-21"
  hours: number; // decimal: 4.5
  startTime?: string; // "09:00"
  endTime?: string; // "13:00"
  createdAt: string;
  updatedAt: string;
}

// Week Timesheet (aggregated view)
export interface WeekTimesheet {
  id: string;
  userId: string;
  weekNumber: number; // 1-52
  weekStartDate: string; // ISO date of Monday
  weekEndDate: string; // ISO date of Friday
  status: Status; // COMPLETED, INCOMPLETE, MISSING
  totalHours: number;
  entries: TimeEntry[]; // All entries for this week
  createdAt: string;
  updatedAt: string;
}

// Date-based grouping (for week view)
export interface DayGroup {
  date: string; // "2024-01-21"
  displayDate: string; // "Jan 21"
  entries: TimeEntry[];
  totalHours: number;
}

// Project
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

// API Request/Response Types
export interface GetTimesheetsParams {
  userId?: string;
  dateRange?: string; // "7", "30", "90", "this_month", "last_month"
  status?: Status;
  page?: number;
  limit?: number;
}

export interface GetTimesheetsResponse {
  timesheets: WeekTimesheet[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateTimeEntryRequest {
  projectId: string;
  taskName: string;
  description?: string;
  date: string;
  hours: number;
  startTime?: string;
  endTime?: string;
}

export interface UpdateTimeEntryRequest extends Partial<CreateTimeEntryRequest> {
  id: string;
}

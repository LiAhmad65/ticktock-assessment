/**
 * Time Entry Data Service
 * Service layer for time entry data operations
 */

import { TimeEntry, CreateTimeEntryRequest } from '@/types/timesheet';
import { timesheetsMockEntries } from '../timesheets/timesheetsMockData';
import { getProjectById } from '../projects/projectDataService';
import { validateTimeEntryRequest, generateEntryId } from './timeEntryHelpers';

/**
 * Create a new time entry
 */
export function createTimeEntry(
  request: CreateTimeEntryRequest,
  userId: string
): TimeEntry {
  // Validate request
  const validation = validateTimeEntryRequest(request);
  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid time entry request');
  }

  // Get project details
  const project = getProjectById(request.projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  // Create new entry
  const now = new Date().toISOString();
  const entry: TimeEntry = {
    id: generateEntryId(),
    userId,
    projectId: request.projectId,
    projectName: project.name,
    taskName: request.taskName,
    description: request.description,
    date: request.date,
    hours: request.hours,
    startTime: request.startTime,
    endTime: request.endTime,
    createdAt: now,
    updatedAt: now,
  };

  // In a real application, this would save to a database
  // For now, we'll just return the entry (mock data is read-only)
  return entry;
}

/**
 * Get time entries by user ID
 */
export function getTimeEntriesByUserId(userId: string): TimeEntry[] {
  return timesheetsMockEntries.filter((entry) => entry.userId === userId);
}

/**
 * Time Entry Data Service (Update & Delete)
 * Service layer for updating and deleting time entry data operations
 */

import { TimeEntry, UpdateTimeEntryRequest } from '@/types/timesheet';
import { timesheetsMockEntries } from '../../timesheets/timesheetsMockData';
import { getProjectById } from '../../projects/projectDataService';
import { validateTimeEntryRequest } from '../timeEntryHelpers';

/**
 * Update an existing time entry
 * Note: In a real application, this would update the database
 * For mock data, we'll return the updated entry structure
 */
export function updateTimeEntryById(
  request: UpdateTimeEntryRequest,
  userId: string
): TimeEntry | null {
  // Find the existing entry
  const existingEntry = timesheetsMockEntries.find(
    (entry) => entry.id === request.id && entry.userId === userId
  );

  if (!existingEntry) {
    return null;
  }

  // Get project details (use existing or new)
  const projectId = request.projectId || existingEntry.projectId;
  const project = getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  // Validate the update request
  const validation = validateTimeEntryRequest({
    projectId,
    taskName: request.taskName || existingEntry.taskName,
    description: request.description,
    date: request.date || existingEntry.date,
    hours: request.hours !== undefined ? request.hours : existingEntry.hours,
  });

  if (!validation.isValid) {
    throw new Error(validation.error || 'Invalid time entry request');
  }

  // Create updated entry
  const now = new Date().toISOString();
  const updatedEntry: TimeEntry = {
    id: existingEntry.id,
    userId: existingEntry.userId,
    projectId,
    projectName: project.name,
    taskName: request.taskName || existingEntry.taskName,
    description: request.description !== undefined ? request.description : existingEntry.description,
    date: request.date || existingEntry.date,
    hours: request.hours !== undefined ? request.hours : existingEntry.hours,
    startTime: request.startTime !== undefined ? request.startTime : existingEntry.startTime,
    endTime: request.endTime !== undefined ? request.endTime : existingEntry.endTime,
    createdAt: existingEntry.createdAt,
    updatedAt: now,
  };

  // In a real application, this would save to a database
  // For mock data, we'll just return the updated entry structure
  return updatedEntry;
}

/**
 * Delete an existing time entry
 * Note: In a real application, this would delete from the database
 * For mock data, we'll check if the entry exists and return success
 */
export function deleteTimeEntryById(
  entryId: string,
  userId: string
): boolean {
  // Find the existing entry
  const existingEntry = timesheetsMockEntries.find(
    (entry) => entry.id === entryId && entry.userId === userId
  );

  if (!existingEntry) {
    return false;
  }

  // In a real application, this would delete from a database
  // For mock data, we'll just return true to indicate success
  return true;
}

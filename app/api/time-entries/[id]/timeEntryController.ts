/**
 * Time Entry Controller (Update & Delete)
 * Business logic for updating and deleting time entry operations
 */

import { TimeEntry, UpdateTimeEntryRequest } from '@/types/timesheet';
import { updateTimeEntryById, deleteTimeEntryById } from './timeEntryDataService';

/**
 * Update an existing time entry
 */
export async function updateTimeEntry(
  request: UpdateTimeEntryRequest,
  userId: string
): Promise<TimeEntry | null> {
  return updateTimeEntryById(request, userId);
}

/**
 * Delete an existing time entry
 */
export async function deleteTimeEntry(
  entryId: string,
  userId: string
): Promise<boolean> {
  return deleteTimeEntryById(entryId, userId);
}

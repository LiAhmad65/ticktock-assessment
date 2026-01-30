/**
 * Time Entry Controller (Update)
 * Business logic for updating time entry operations
 */

import { TimeEntry, UpdateTimeEntryRequest } from '@/types/timesheet';
import { updateTimeEntryById } from './timeEntryDataService';

/**
 * Update an existing time entry
 */
export async function updateTimeEntry(
  request: UpdateTimeEntryRequest,
  userId: string
): Promise<TimeEntry | null> {
  return updateTimeEntryById(request, userId);
}

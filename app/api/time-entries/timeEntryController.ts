/**
 * Time Entry Controller
 * Business logic for time entry operations
 */

import { TimeEntry, CreateTimeEntryRequest } from '@/types/timesheet';
import { createTimeEntry } from './timeEntryDataService';

/**
 * Create a new time entry
 */
export async function createNewTimeEntry(
  request: CreateTimeEntryRequest,
  userId: string
): Promise<TimeEntry> {
  return createTimeEntry(request, userId);
}

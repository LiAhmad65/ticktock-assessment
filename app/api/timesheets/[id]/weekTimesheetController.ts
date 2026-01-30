/**
 * Week Timesheet Controller
 * Business logic for single week timesheet operations
 */

import { WeekTimesheet } from '@/types/timesheet';
import { getWeekTimesheetById } from './weekTimesheetDataService';

/**
 * Get a single week timesheet by ID
 */
export async function getWeekTimesheet(
  weekId: string,
  userId: string = '1'
): Promise<WeekTimesheet | null> {
  return getWeekTimesheetById(weekId, userId);
}

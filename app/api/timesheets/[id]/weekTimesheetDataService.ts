/**
 * Week Timesheet Data Service
 * Service layer for single week timesheet data operations
 */

import { WeekTimesheet } from '@/types/timesheet';
import { generateWeekTimesheetsFromEntries } from '../timesheetsDataService';

/**
 * Get a single week timesheet by ID
 */
export function getWeekTimesheetById(
  weekId: string,
  userId: string = '1'
): WeekTimesheet | null {
  const weeks = generateWeekTimesheetsFromEntries(userId);
  return weeks.find((week) => week.id === weekId) || null;
}

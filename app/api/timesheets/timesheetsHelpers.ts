/**
 * Timesheets Helpers
 * Helper functions for timesheets operations
 */

import { Status } from '@/utils/constants';
import { WeekTimesheet } from '@/types/timesheet';

/**
 * Filter weeks by date range
 */
export function filterByDateRange(
  weeks: WeekTimesheet[],
  range?: string
): WeekTimesheet[] {
  if (!range) return weeks;

  const today = new Date();
  let startDate: Date;

  switch (range) {
    case '7':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      break;
    case '30':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      break;
    case '90':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 90);
      break;
    case 'this_month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case 'last_month':
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      return weeks.filter(
        (week) =>
          new Date(week.weekStartDate) >= startDate &&
          new Date(week.weekStartDate) <= lastDay
      );
    default:
      return weeks;
  }

  return weeks.filter((week) => new Date(week.weekStartDate) >= startDate);
}

/**
 * Filter weeks by status
 */
export function filterByStatus(
  weeks: WeekTimesheet[],
  status?: string
): WeekTimesheet[] {
  if (!status || status === Status.ALL) return weeks;
  return weeks.filter((week) => week.status === status);
}

/**
 * Apply pagination to weeks array
 */
export function paginateWeeks(
  weeks: WeekTimesheet[],
  page: number,
  limit: number
): {
  paginatedWeeks: WeekTimesheet[];
  total: number;
  totalPages: number;
} {
  const total = weeks.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedWeeks = weeks.slice(startIndex, endIndex);

  return {
    paginatedWeeks,
    total,
    totalPages,
  };
}

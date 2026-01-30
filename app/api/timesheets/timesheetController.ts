/**
 * Timesheet Controller
 * Business logic for timesheets operations
 */

import { WeekTimesheet, GetTimesheetsParams, GetTimesheetsResponse } from '@/types/timesheet';
import { filterByDateRange, filterByStatus, paginateWeeks } from './timesheetsHelpers';
import { generateWeekTimesheetsFromEntries } from './timesheetsDataService';

/**
 * Get timesheets list with filtering and pagination
 */
export async function getTimesheets(
  params: GetTimesheetsParams
): Promise<GetTimesheetsResponse> {
  // Get mock data - always use "1" for mock data
  let weeks = generateWeekTimesheetsFromEntries("1");

  // Apply filters
  if (params.dateRange) {
    weeks = filterByDateRange(weeks, params.dateRange);
  }

  if (params.status) {
    weeks = filterByStatus(weeks, params.status);
  }

  // Apply pagination
  const { paginatedWeeks, total, totalPages } = paginateWeeks(
    weeks,
    params.page || 1,
    params.limit || 10
  );

  // Format response
  return {
    timesheets: paginatedWeeks,
    total,
    page: params.page || 1,
    limit: params.limit || 10,
    totalPages,
  };
}

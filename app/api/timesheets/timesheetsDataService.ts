/**
 * Timesheets Data Service
 * Service layer for timesheets data operations
 */

import { Status } from '@/utils/constants';
import { WeekTimesheet, TimeEntry } from '@/types/timesheet';
import { timesheetsMockEntries } from './timesheetsMockData';

/**
 * Calculate status for a week based on entries
 */
function calculateStatus(entries: TimeEntry[], weekStartDate: string): Status {
  if (entries.length === 0) {
    return Status.MISSING;
  }

  // Get weekdays (Mon-Fri)
  const weekDays: string[] = [];
  const start = new Date(weekStartDate);
  for (let i = 0; i < 5; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    weekDays.push(date.toISOString().split('T')[0]);
  }

  // Check if all weekdays have >= 8 hours
  const allDaysComplete = weekDays.every((day) => {
    const dayEntries = entries.filter((e) => e.date === day);
    const dayHours = dayEntries.reduce((sum, e) => sum + e.hours, 0);
    return dayHours >= 8;
  });

  return allDaysComplete ? Status.COMPLETED : Status.INCOMPLETE;
}

/**
 * Get week start (Monday) and end (Friday) dates
 */
function getWeekDates(weekStartDate: string): {
  weekStartDate: string;
  weekEndDate: string;
} {
  const start = new Date(weekStartDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 4); // Friday

  return {
    weekStartDate: start.toISOString().split('T')[0],
    weekEndDate: end.toISOString().split('T')[0],
  };
}

/**
 * Get week number from date
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Get Monday of a week from a date
 */
function getMondayOfWeek(date: Date): string {
  const dayOfWeek = date.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToMonday);
  return monday.toISOString().split('T')[0];
}

/**
 * Generate week timesheets from time entries
 */
export function generateWeekTimesheetsFromEntries(
  userId: string = '1'
): WeekTimesheet[] {
  const userEntries = timesheetsMockEntries.filter((e) => e.userId === userId);
  // Group entries by week
  const weeksMap = new Map<string, TimeEntry[]>();

  userEntries.forEach((entry) => {
    const date = new Date(entry.date);
    const monday = getMondayOfWeek(date);
    const weekKey = monday;

    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, []);
    }
    weeksMap.get(weekKey)!.push(entry);
  });

  const weekTimesheets: WeekTimesheet[] = [];

  weeksMap.forEach((entries, weekKey) => {
    const { weekStartDate, weekEndDate } = getWeekDates(weekKey);

    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const status = calculateStatus(entries, weekStartDate);

    weekTimesheets.push({
      id: weekStartDate, // Use weekStartDate as ID for consistency
      userId,
      weekNumber: 0, // Will be set after sorting
      weekStartDate,
      weekEndDate,
      status,
      totalHours,
      entries,
      createdAt: weekStartDate + 'T00:00:00Z',
      updatedAt: new Date().toISOString(),
    });
  });

  // Sort by week start date (newest first)
  const sortedWeeks = weekTimesheets.sort(
    (a, b) => new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
  );

  // Assign week numbers and IDs after sorting
  return sortedWeeks.map((week, index) => ({
    ...week,
    id: `week-${index + 1}`, // Assign ID based on sorted position
    weekNumber: index + 1,
  }));
}

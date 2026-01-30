/**
 * Week Timesheet Helpers
 * Helper functions for single week timesheet operations
 */

import { WeekTimesheet, TimeEntry } from '@/types/timesheet';

/**
 * Format date range for display
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const startMonth = start.toLocaleString('default', { month: 'long' });
  const startYear = start.getFullYear();
  
  const endDay = end.getDate();
  const endMonth = end.toLocaleString('default', { month: 'long' });
  const endYear = end.getFullYear();
  
  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay} - ${endDay} ${startMonth}, ${startYear}`;
  } else if (startYear === endYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${startYear}`;
  } else {
    return `${startDay} ${startMonth}, ${startYear} - ${endDay} ${endMonth}, ${endYear}`;
  }
}

/**
 * Group time entries by date
 */
export function groupEntriesByDate(entries: TimeEntry[]): {
  date: string;
  displayDate: string;
  tasks: {
    id: string;
    name: string;
    hours: number;
    projectName: string;
  }[];
}[] {
  const grouped: { date: string; displayDate: string; tasks: any[] }[] = [];
  const dateMap = new Map<string, any[]>();

  entries.forEach((entry) => {
    const date = entry.date;
    if (!dateMap.has(date)) {
      dateMap.set(date, []);
    }
    dateMap.get(date)!.push({
      id: entry.id,
      name: entry.taskName,
      hours: entry.hours,
      projectName: entry.projectName,
    });
  });

  dateMap.forEach((tasks, date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    grouped.push({
      date,
      displayDate: `${month} ${day}`,
      tasks,
    });
  });

  // Sort by date
  return grouped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

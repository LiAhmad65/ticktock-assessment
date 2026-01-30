/**
 * Mock Data Service
 * In-memory data store for development and testing
 */

import { Status } from '@/utils/constants';
import { WeekTimesheet, TimeEntry, Project } from '@/types/timesheet';

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Main client project',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Project Beta',
    description: 'Internal tooling',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Project Gamma',
    description: 'Marketing website',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Helper function to get date string N days ago
function getDateDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Helper function to get Monday of a week N weeks ago
function getMondayWeeksAgo(weeksAgo: number): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMonday - (weeksAgo * 7));
  return monday.toISOString().split('T')[0];
}

// Helper function to get date N days after a given date
function getDateAfterDays(baseDate: string, days: number): string {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Mock Time Entries - Using recent dates relative to today
export const mockTimeEntries: TimeEntry[] = [
  // Week 1: 1 week ago (COMPLETED - all 5 days with 8 hours)
  ...(() => {
    const monday = getMondayWeeksAgo(1);
    return [
      {
        id: 'entry-1',
        userId: '1',
        projectId: '1',
        projectName: 'Project Alpha',
        taskName: 'Homepage Development',
        description: 'Building homepage components',
        date: monday,
        hours: 8,
        startTime: '09:00',
        endTime: '17:00',
        createdAt: monday + 'T09:00:00Z',
        updatedAt: monday + 'T09:00:00Z',
      },
      {
        id: 'entry-2',
        userId: '1',
        projectId: '1',
        projectName: 'Project Alpha',
        taskName: 'API Integration',
        description: 'Connecting frontend to backend',
        date: getDateAfterDays(monday, 1),
        hours: 8,
        startTime: '09:00',
        endTime: '17:00',
        createdAt: getDateAfterDays(monday, 1) + 'T09:00:00Z',
        updatedAt: getDateAfterDays(monday, 1) + 'T09:00:00Z',
      },
      {
        id: 'entry-3',
        userId: '1',
        projectId: '2',
        projectName: 'Project Beta',
        taskName: 'Database Setup',
        date: getDateAfterDays(monday, 2),
        hours: 8,
        createdAt: getDateAfterDays(monday, 2) + 'T09:00:00Z',
        updatedAt: getDateAfterDays(monday, 2) + 'T09:00:00Z',
      },
      {
        id: 'entry-4',
        userId: '1',
        projectId: '1',
        projectName: 'Project Alpha',
        taskName: 'Testing',
        date: getDateAfterDays(monday, 3),
        hours: 8,
        createdAt: getDateAfterDays(monday, 3) + 'T09:00:00Z',
        updatedAt: getDateAfterDays(monday, 3) + 'T09:00:00Z',
      },
      {
        id: 'entry-5',
        userId: '1',
        projectId: '3',
        projectName: 'Project Gamma',
        taskName: 'Design Review',
        date: getDateAfterDays(monday, 4),
        hours: 8,
        createdAt: getDateAfterDays(monday, 4) + 'T09:00:00Z',
        updatedAt: getDateAfterDays(monday, 4) + 'T09:00:00Z',
      },
    ];
  })(),
  // Week 2: 2 weeks ago (COMPLETED - all 5 days with 8 hours)
  ...(() => {
    const monday = getMondayWeeksAgo(2);
    return [
      { id: 'entry-6', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: monday, hours: 8, createdAt: monday + 'T09:00:00Z', updatedAt: monday + 'T09:00:00Z' },
      { id: 'entry-7', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 1), hours: 8, createdAt: getDateAfterDays(monday, 1) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 1) + 'T09:00:00Z' },
      { id: 'entry-8', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 2), hours: 8, createdAt: getDateAfterDays(monday, 2) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 2) + 'T09:00:00Z' },
      { id: 'entry-9', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 3), hours: 8, createdAt: getDateAfterDays(monday, 3) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 3) + 'T09:00:00Z' },
      { id: 'entry-10', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 4), hours: 8, createdAt: getDateAfterDays(monday, 4) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 4) + 'T09:00:00Z' },
    ];
  })(),
  // Week 3: 3 weeks ago (INCOMPLETE - only 3 days with 4 hours each)
  ...(() => {
    const monday = getMondayWeeksAgo(3);
    return [
      { id: 'entry-11', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: monday, hours: 4, createdAt: monday + 'T09:00:00Z', updatedAt: monday + 'T09:00:00Z' },
      { id: 'entry-12', userId: '1', projectId: '2', projectName: 'Project Beta', taskName: 'API Integration', date: getDateAfterDays(monday, 1), hours: 4, createdAt: getDateAfterDays(monday, 1) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 1) + 'T09:00:00Z' },
      { id: 'entry-13', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Testing', date: getDateAfterDays(monday, 2), hours: 4, createdAt: getDateAfterDays(monday, 2) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 2) + 'T09:00:00Z' },
    ];
  })(),
  // Week 4: 4 weeks ago (COMPLETED - all 5 days with 8 hours)
  ...(() => {
    const monday = getMondayWeeksAgo(4);
    return [
      { id: 'entry-14', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: monday, hours: 8, createdAt: monday + 'T09:00:00Z', updatedAt: monday + 'T09:00:00Z' },
      { id: 'entry-15', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 1), hours: 8, createdAt: getDateAfterDays(monday, 1) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 1) + 'T09:00:00Z' },
      { id: 'entry-16', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 2), hours: 8, createdAt: getDateAfterDays(monday, 2) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 2) + 'T09:00:00Z' },
      { id: 'entry-17', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 3), hours: 8, createdAt: getDateAfterDays(monday, 3) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 3) + 'T09:00:00Z' },
      { id: 'entry-18', userId: '1', projectId: '1', projectName: 'Project Alpha', taskName: 'Homepage Development', date: getDateAfterDays(monday, 4), hours: 8, createdAt: getDateAfterDays(monday, 4) + 'T09:00:00Z', updatedAt: getDateAfterDays(monday, 4) + 'T09:00:00Z' },
    ];
  })(),
];

// Helper function to get week start (Monday) and end (Friday) dates
function getWeekDates(weekNumber: number, year: number = 2024): {
  weekStartDate: string;
  weekEndDate: string;
} {
  const jan1 = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7;
  const weekStart = new Date(jan1);
  weekStart.setDate(jan1.getDate() + daysOffset - jan1.getDay() + 1); // Monday
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4); // Friday

  return {
    weekStartDate: weekStart.toISOString().split('T')[0],
    weekEndDate: weekEnd.toISOString().split('T')[0],
  };
}

// Helper function to calculate status
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

// Generate mock week timesheets from entries
export function generateMockWeekTimesheets(userId: string = '1'): WeekTimesheet[] {
  const userEntries = mockTimeEntries.filter((e) => e.userId === userId);
  
  // Group entries by week
  const weeksMap = new Map<string, TimeEntry[]>();
  
  userEntries.forEach((entry) => {
    const date = new Date(entry.date);
    const weekNumber = getWeekNumber(date);
    const weekKey = `${date.getFullYear()}-W${weekNumber}`;
    
    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, []);
    }
    weeksMap.get(weekKey)!.push(entry);
  });

  const weekTimesheets: WeekTimesheet[] = [];
  let weekCounter = 1;

  weeksMap.forEach((entries, weekKey) => {
    const [year, weekNum] = weekKey.split('-W');
    const weekNumber = parseInt(weekNum);
    const { weekStartDate, weekEndDate } = getWeekDates(weekNumber, parseInt(year));
    
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const status = calculateStatus(entries, weekStartDate);

    weekTimesheets.push({
      id: `week-${weekCounter}`,
      userId,
      weekNumber: weekCounter,
      weekStartDate,
      weekEndDate,
      status,
      totalHours,
      entries,
      createdAt: weekStartDate + 'T00:00:00Z',
      updatedAt: new Date().toISOString(),
    });

    weekCounter++;
  });

  // Sort by week start date (newest first)
  return weekTimesheets.sort(
    (a, b) => new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
  );
}

// Helper to get week number from date
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Export mock data getters
export const mockDataService = {
  getProjects: () => mockProjects,
  getTimeEntries: (userId?: string) =>
    userId ? mockTimeEntries.filter((e) => e.userId === userId) : mockTimeEntries,
  getWeekTimesheets: (userId?: string) => generateMockWeekTimesheets(userId),
};

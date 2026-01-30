/**
 * Timesheets Mock Data
 * Mock data specific to timesheets endpoint
 */

import { TimeEntry } from '@/types/timesheet';

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
export const timesheetsMockEntries: TimeEntry[] = [
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

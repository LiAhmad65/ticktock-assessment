/**
 * Time Entry Helpers
 * Helper functions for time entry operations
 */

import { TimeEntry, CreateTimeEntryRequest } from '@/types/timesheet';

/**
 * Validate time entry request
 */
export function validateTimeEntryRequest(
  request: CreateTimeEntryRequest
): { isValid: boolean; error?: string } {
  if (!request.projectId) {
    return { isValid: false, error: 'Project ID is required' };
  }

  if (!request.taskName || request.taskName.trim() === '') {
    return { isValid: false, error: 'Task name is required' };
  }

  if (!request.date) {
    return { isValid: false, error: 'Date is required' };
  }

  if (request.hours === undefined || request.hours === null) {
    return { isValid: false, error: 'Hours is required' };
  }

  if (request.hours < 0) {
    return { isValid: false, error: 'Hours must be greater than or equal to 0' };
  }

  if (request.hours > 24) {
    return { isValid: false, error: 'Hours cannot exceed 24' };
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(request.date)) {
    return { isValid: false, error: 'Invalid date format. Expected YYYY-MM-DD' };
  }

  return { isValid: true };
}

/**
 * Generate unique entry ID
 */
export function generateEntryId(): string {
  return `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

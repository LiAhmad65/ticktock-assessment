/**
 * Project Data Service
 * Service layer for projects data operations
 */

import { Project } from '@/types/timesheet';
import { projectsMockData } from './projectMockData';

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projectsMockData;
}

/**
 * Get project by ID
 */
export function getProjectById(projectId: string): Project | null {
  return projectsMockData.find((project) => project.id === projectId) || null;
}

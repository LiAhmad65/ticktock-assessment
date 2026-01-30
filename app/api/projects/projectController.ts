/**
 * Project Controller
 * Business logic for projects operations
 */

import { Project } from '@/types/timesheet';
import { getAllProjects } from './projectDataService';

/**
 * Get all projects
 */
export async function getProjects(): Promise<Project[]> {
  return getAllProjects();
}

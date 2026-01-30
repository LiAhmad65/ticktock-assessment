/**
 * Projects Mock Data
 * Mock data specific to projects endpoint
 */

import { Project } from '@/types/timesheet';

// Mock Projects
export const projectsMockData: Project[] = [
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

/**
 * POST /api/time-entries
 * Route handler for creating a new time entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { CreateTimeEntryRequest } from '@/types/timesheet';
import { createNewTimeEntry } from './timeEntryController';

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - No session found' },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = (session.user as any)?.id || session.user?.email;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - No user ID in session' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: CreateTimeEntryRequest = await request.json();

    // Create time entry using controller
    const newEntry = await createNewTimeEntry(body, userId);

    return NextResponse.json(
      {
        data: newEntry,
        message: 'Time entry created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating time entry:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

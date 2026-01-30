/**
 * PUT /api/time-entries/[id]
 * Route handler for updating a time entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { UpdateTimeEntryRequest } from '@/types/timesheet';
import { updateTimeEntry } from './timeEntryController';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Get entryId from route params
    const { id: entryId } = await params;

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Parse request body
    const body: UpdateTimeEntryRequest = await request.json();

    // Ensure ID matches
    if (body.id !== entryId) {
      return NextResponse.json(
        { error: 'Entry ID mismatch' },
        { status: 400 }
      );
    }

    // Update time entry using controller
    const updatedEntry = await updateTimeEntry(body, userId);

    if (!updatedEntry) {
      return NextResponse.json(
        { error: 'Time entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: updatedEntry,
      message: 'Time entry updated successfully',
    });
  } catch (error) {
    console.error('Error updating time entry:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

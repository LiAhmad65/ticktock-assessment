/**
 * GET /api/timesheets/[id]
 * Route handler for getting a single week timesheet by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { getWeekTimesheet } from './weekTimesheetController';

export async function GET(
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

    // Get weekId from route params (await params in Next.js 13+)
    const { id: weekId } = await params;

    if (!weekId) {
      return NextResponse.json(
        { error: 'Week ID is required' },
        { status: 400 }
      );
    }

    // Get week timesheet using controller
    const weekData = await getWeekTimesheet(weekId, "1");

    if (!weekData) {
      return NextResponse.json(
        { error: 'Week timesheet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: weekData,
      message: 'Week timesheet retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching week timesheet:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

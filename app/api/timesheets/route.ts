/**
 * GET /api/timesheets
 * Route handler for getting list of week timesheets
 * 
 * Query Parameters:
 * - userId: Filter by user ID (optional, defaults to authenticated user)
 * - dateRange: Filter by date range ("7", "30", "90", "this_month", "last_month")
 * - status: Filter by status (Status enum)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { Status } from '@/utils/constants';
import { GetTimesheetsParams } from '@/types/timesheet';
import { getTimesheets } from './timesheetController';

export async function GET(request: NextRequest) {
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

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const params: GetTimesheetsParams = {
      userId: searchParams.get('userId') || userId,
      dateRange: searchParams.get('dateRange') || undefined,
      status: (searchParams.get('status') as Status) || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    // Get timesheets using controller
    const response = await getTimesheets(params);

    return NextResponse.json({
      data: response,
      message: 'Timesheets retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

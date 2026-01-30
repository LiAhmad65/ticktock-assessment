"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/WeekTimeSheetPage/Loader/Loader";
import WeekTimeSheetRow from "@/components/WeekTimeSheetPage/WeekTimeSheetRow/WeekTimeSheetRow";
import { useEffect, useState, useCallback, useRef } from "react";
import api from "@/services/api";
import { endpoints } from "@/services/endpoints";
import { WeekTimesheet } from "@/types/timesheet";

const WeekTimeSheetPage = () => {
  const params = useParams();
  const weekId = params.id as string;
  const [weekData, setWeekData] = useState<WeekTimesheet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  // Fetch week data from API
  const fetchWeekData = useCallback(async () => {
    if (!weekId || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<WeekTimesheet>(
        endpoints.timesheets.detail(weekId)
      );

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setWeekData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch week data");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [weekId]);

  useEffect(() => {
    fetchWeekData();
  }, [fetchWeekData]);

  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDay = start.getDate();
    const startMonth = start.toLocaleString('default', { month: 'long' });
    const startYear = start.getFullYear();
    
    const endDay = end.getDate();
    const endMonth = end.toLocaleString('default', { month: 'long' });
    const endYear = end.getFullYear();
    
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay} - ${endDay} ${startMonth}, ${startYear}`;
    } else if (startYear === endYear) {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${startYear}`;
    } else {
      return `${startDay} ${startMonth}, ${startYear} - ${endDay} ${endMonth}, ${endYear}`;
    }
  };

  // Group entries by date
  const groupEntriesByDate = () => {
    if (!weekData) return [];

    const grouped: { date: string; displayDate: string; tasks: any[] }[] = [];
    const dateMap = new Map<string, any[]>();

    weekData.entries.forEach((entry) => {
      const date = entry.date;
      if (!dateMap.has(date)) {
        dateMap.set(date, []);
      }
      dateMap.get(date)!.push({
        id: entry.id,
        name: entry.taskName,
        hours: entry.hours,
        projectName: entry.projectName,
        projectId: entry.projectId,
        description: entry.description,
        taskName: entry.taskName,
        date: entry.date,
      });
    });

    dateMap.forEach((tasks, date) => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('default', { month: 'short' });
      grouped.push({
        date,
        displayDate: `${month} ${day}`,
        tasks,
      });
    });

    // Sort by date
    return grouped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-gray-500">Loading week timesheet...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!weekData) {
    return (
      <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-gray-500">Week timesheet not found</div>
        </div>
      </div>
    );
  }

  const groupedData = groupEntriesByDate();

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_188px] items-center gap-4">
        <span className="text-gray-900 font-bold text-xl md:text-2xl">
          This week's timesheet
        </span>
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <Loader />
        </div>
      </div>
      <div className='w-full py-6'>
        <span className='text-sm text-gray-400'>
          {formatDateRange(weekData.weekStartDate, weekData.weekEndDate)}
        </span>
      </div>
      <div className="w-full flex flex-col gap-6">
        {groupedData.length > 0 ? (
          groupedData.map((row) => (
            <WeekTimeSheetRow 
              key={row.date}
              date={row.date} 
              displayDate={row.displayDate}
              tasks={row.tasks}
              onEntryAdded={fetchWeekData}
            />
          ))
        ) : (
          <div className="w-full py-8 text-center text-gray-500">
            No time entries for this week
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekTimeSheetPage;

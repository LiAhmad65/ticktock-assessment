"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import AppDropdown from "@/components/AppDropdown/AppDropdown";
import StatusTag from "@/components/StatusTag/StatusTag";
import { Status, statusOptions, DropdownOption } from "@/utils/constants";
import { dateRangeOptions, timesheetColumns } from "@/utils/staticData";
import Table from "@/components/timesheets/Table/Table";
import Pagination from "@/components/timesheets/Pagination/Pagination";
import api from "@/services/api";
import { endpoints } from "@/services/endpoints";
import { WeekTimesheet } from "@/types/timesheet";
import toast from "react-hot-toast";

const perPageOptions: DropdownOption[] = [
  { label: "5 per page", value: 5 },
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "50 per page", value: 50 },
];

// Helper function to format date range
function formatDateRange(startDate: string, endDate: string): string {
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
}

// Transform API data to table format
function transformToTableData(weeks: WeekTimesheet[]) {
  return weeks.map((week) => {
    // Determine action based on status
    let action = "View";
    if (week.status === Status.MISSING) {
      action = "Create";
    } else if (week.status === Status.INCOMPLETE) {
      action = "Update";
    }
    
    return {
      id: week.id,
      week: week.weekNumber.toString(),
      date: formatDateRange(week.weekStartDate, week.weekEndDate),
      dateValue: week.weekStartDate, // Store original date for sorting
      status: week.status,
      actions: action,
    };
  });
}

const TimesheetsTable = () => {
  const [dateRange, setDateRange] = useState<string | number>("");
  const [status, setStatus] = useState<string | number>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Fetch timesheets from API
  const fetchTimesheets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string | number> = {
        page: currentPage,
        limit: itemsPerPage,
      };
      
      if (dateRange) {
        params.dateRange = dateRange;
      }
      
      if (status && status !== Status.ALL) {
        params.status = status;
      }
      
      const response = await api.get<{
        timesheets: WeekTimesheet[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      }>(endpoints.timesheets.list, params);
      
      if (response.error) {
        const errorMessage = response.error || "Failed to fetch timesheets";
        setError(errorMessage);
        setTableData([]);
        toast.error(errorMessage);
      } else if (response.data) {
        const { timesheets, totalPages: pages } = response.data;
        const transformedData = transformToTableData(timesheets);
        setTableData(transformedData);
        setTotalPages(pages);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch timesheets";
      setError(errorMessage);
      setTableData([]);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, status, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [dateRange, status]);

  // Sort data locally
  const sortedData = useMemo(() => {
    if (!sortBy) return tableData;

    return [...tableData].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'week':
          comparison = parseInt(a.week) - parseInt(b.week);
          break;
        case 'date':
          // Sort by the original date value stored in dateValue
          const dateA = a.dateValue ? new Date(a.dateValue as string).getTime() : 0;
          const dateB = b.dateValue ? new Date(b.dateValue as string).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'status':
          // Sort by status priority: MISSING < INCOMPLETE < COMPLETED
          const statusOrder: Record<string, number> = { 
            [Status.MISSING]: 0, 
            [Status.INCOMPLETE]: 1, 
            [Status.COMPLETED]: 2 
          };
          comparison = (statusOrder[a.status as string] || 0) - 
                       (statusOrder[b.status as string] || 0);
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [tableData, sortBy, sortOrder]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle sort order if clicking the same column
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const renderStatusOption = (option: { label: string; value: string | number }) => {
    if (option.value === Status.ALL) {
      return <span className="text-gray-900">{option.label}</span>;
    }
    return <StatusTag status={option.value as Status} />;
  };

  const renderSelectedStatus = (option: { label: string; value: string | number } | undefined) => {
    if (!option || option.value === Status.ALL) {
      return <span className="text-gray-900">{option?.label || "Status"}</span>;
    }
    return <StatusTag status={option.value as Status} />;
  };

  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm mb-4">
      <h1 className='text-gray-900 font-bold text-xl md:text-2xl mb-6'>Your Timesheets</h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-[152px_152px] gap-[10px] mb-6'>
        <AppDropdown
          data={dateRangeOptions}
          defaultValue={dateRange}
          onChange={(value) => setDateRange(value)}
          placeholder="Date Range"
        />
        <AppDropdown
          data={statusOptions}
          defaultValue={status}
          onChange={(value) => setStatus(value)}
          placeholder="Status"
          renderOption={renderStatusOption}
          renderSelected={renderSelectedStatus}
        />
      </div>

      {isLoading ? (
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-gray-500">Loading timesheets...</div>
        </div>
      ) : error ? (
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      ) : tableData.length === 0 ? (
        <div className="w-full py-12 flex items-center justify-center">
          <div className="text-gray-500">No timesheets found</div>
        </div>
      ) : (
        <Table
          columns={timesheetColumns}
          data={sortedData}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}
      <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6'>
        <div className="w-full sm:w-[152px]">
          <AppDropdown
            data={perPageOptions}
            defaultValue={itemsPerPage}
            onChange={(value) => {
              setItemsPerPage(value as number);
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
            placeholder="Per page"
          />
        </div>
        <div className="w-full sm:w-auto overflow-x-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TimesheetsTable;

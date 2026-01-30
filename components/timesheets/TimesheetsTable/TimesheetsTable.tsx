"use client";

import React, { useState } from "react";
import AppDropdown from "@/components/AppDropdown/AppDropdown";
import StatusTag from "@/components/StatusTag/StatusTag";
import { Status, statusOptions, DropdownOption } from "@/utils/constants";
import { dateRangeOptions, timesheetColumns, timesheetData } from "@/utils/staticData";
import Table from "@/components/timesheets/Table/Table";
import Pagination from "@/components/timesheets/Pagination/Pagination";

const perPageOptions: DropdownOption[] = [
  { label: "5 per page", value: 5 },
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "50 per page", value: 50 },
];

const TimesheetsTable = () => {
  const [dateRange, setDateRange] = useState<string | number>("");
  const [status, setStatus] = useState<string | number>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Calculate total pages based on data length
  const totalPages = Math.ceil(timesheetData.length / itemsPerPage);

  const renderStatusOption = (option: { label: string; value: string | number }) => {
    if (option.value === Status.ALL) {
      return option.label;
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
      <span className='text-gray-900 font-bold text-xl md:text-2xl'>Your Timesheets</span>
      <div className='w-full py-6 grid grid-cols-1 sm:grid-cols-[152px_152px] gap-[10px]'>
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

      <Table
        columns={timesheetColumns}
        data={timesheetData}
      />
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

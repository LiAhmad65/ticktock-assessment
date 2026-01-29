"use client";

import React, { useState } from "react";
import AppDropdown from "@/components/AppDropdown/AppDropdown";
import StatusTag from "@/components/StatusTag/StatusTag";
import { Status, statusOptions } from "@/utils/constants";

const TimesheetsTable = () => {
  const [dateRange, setDateRange] = useState<string | number>("");
  const [status, setStatus] = useState<string | number>("");

  const dateRangeOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 30 days", value: "30" },
    { label: "Last 90 days", value: "90" },
    { label: "This month", value: "this_month" },
    { label: "Last month", value: "last_month" },
  ];

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
    </div>
  );
};

export default TimesheetsTable;

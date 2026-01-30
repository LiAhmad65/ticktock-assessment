"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StatusTag from "@/components/StatusTag/StatusTag";
import { Status } from "@/utils/constants";

interface TableColumn {
  header: string;
  accessor: string;
  sortable?: boolean;
}

interface TableRow {
  [key: string]: React.ReactNode | string;
  id?: string;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

const Table = ({ columns, data, sortBy, sortOrder, onSort }: TableProps) => {
  const router = useRouter();

  const handleActionClick = (action: string | React.ReactNode, rowId?: string) => {
    if (!rowId) {
      console.error("No week ID provided");
      return;
    }

    if (action === "View" || action === "Update" || action === "Create") {
      router.push(`/timesheets/${rowId}`);
    } else {
      console.log("Action clicked:", action);
    }
  };

  const handleSortClick = (columnAccessor: string) => {
    if (onSort) {
      onSort(columnAccessor);
    }
  };

  const getSortIcon = (columnAccessor: string) => {
    const isActive = sortBy === columnAccessor;
    const rotation = isActive && sortOrder === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)';
    const colorClass = isActive ? 'text-primary-700' : 'text-gray-500';
    
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={colorClass}
        style={{ transform: rotation, transition: 'transform 0.2s ease' }}
      >
        <path
          d="M3 4.5L6 1.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
        <table className="w-full min-w-[500px] sm:min-w-[600px]">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column, index) => (
                <th
                  key={column.accessor}
                  className={`text-gray-500 text-xs font-medium px-2 sm:px-4 py-3 text-left ${
                    column.accessor === "week" ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSortClick(column.accessor)}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        {getSortIcon(column.accessor)}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="h-[54px] border-b border-gray-200 last:border-b-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-2 sm:px-4 h-[54px] ${
                      column.accessor === "week" ? "bg-gray-50 text-gray-900" : ""
                    } ${
                      column.accessor === "date"
                        ? "text-gray-500 text-sm font-normal"
                        : ""
                    }`}
                  >
                    <div className="flex items-center h-full">
                      {column.accessor === "actions" ? (
                        <span
                          className="text-primary-700 text-sm cursor-pointer hover:underline"
                          onClick={() => handleActionClick(row[column.accessor], row.id)}
                        >
                          {row[column.accessor] as string}
                        </span>
                      ) : column.accessor === "status" ? (
                        <StatusTag status={row[column.accessor] as Status} />
                      ) : (
                        row[column.accessor]
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

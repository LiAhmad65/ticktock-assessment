import React from "react";
import StatusTag from "@/components/StatusTag/StatusTag";
import { Status } from "@/utils/constants";

interface TableColumn {
  header: string;
  accessor: string;
  sortable?: boolean;
}

interface TableRow {
  [key: string]: React.ReactNode | string;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
}

const Table = ({ columns, data }: TableProps) => {
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
                        onClick={() => {
                          // Sort handler will be added later
                          console.log("Sort clicked:", column.accessor);
                        }}
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-500"
                        >
                          <path
                            d="M3 4.5L6 1.5L9 4.5M3 7.5L6 10.5L9 7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                key={rowIndex}
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
                          className="text-primary-700 text-sm cursor-pointer"
                          onClick={() => {
                            // Action handler will be added later
                            console.log("Action clicked:", row[column.accessor]);
                          }}
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

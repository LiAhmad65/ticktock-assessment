import { Status } from "./constants";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface TableColumn {
  header: string;
  accessor: string;
  sortable?: boolean;
}

export interface TableRow {
  [key: string]: string | Status;
  week: string;
  date: string;
  status: Status;
  actions: string;
}

export const dateRangeOptions: DropdownOption[] = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
  { label: "This month", value: "this_month" },
  { label: "Last month", value: "last_month" },
];

export const timesheetColumns: TableColumn[] = [
  { header: "WEEK #", accessor: "week", sortable: true },
  { header: "DATE", accessor: "date", sortable: true },
  { header: "STATUS", accessor: "status", sortable: true },
  { header: "ACTIONS", accessor: "actions" },
];

export const timesheetData: TableRow[] = [
  {
    week: "1",
    date: "1 - 5 January, 2024",
    status: Status.COMPLETED,
    actions: "View",
  },
  {
    week: "2",
    date: "8 - 12 January, 2024",
    status: Status.COMPLETED,
    actions: "View",
  },
  {
    week: "3",
    date: "15 - 19 January, 2024",
    status: Status.INCOMPLETE,
    actions: "Update",
  },
  {
    week: "4",
    date: "22 - 26 January, 2024",
    status: Status.COMPLETED,
    actions: "View",
  },
  {
    week: "5",
    date: "28 January - 1 February, 2024",
    status: Status.MISSING,
    actions: "Create",
  },
];

export enum Status {
  ALL = "all",
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
  MISSING = "missing",
}

export interface DropdownOption {
  label: string;
  value: string | number;
}

export const statusOptions: DropdownOption[] = [
  { label: "All", value: Status.ALL },
  { label: "Completed", value: Status.COMPLETED },
  { label: "Incomplete", value: Status.INCOMPLETE },
  { label: "Missing", value: Status.MISSING },
];

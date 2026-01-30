import React from "react";
import { Status } from "@/utils/constants";

interface StatusTagProps {
  status: Status;
}

const StatusTag = ({ status }: StatusTagProps) => {
  const defaultConfig = {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "UNKNOWN",
  };

  const statusConfig: Record<Status.COMPLETED | Status.INCOMPLETE | Status.MISSING, { bg: string; text: string; label: string }> = {
    [Status.COMPLETED]: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "COMPLETED",
    },
    [Status.INCOMPLETE]: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "INCOMPLETE",
    },
    [Status.MISSING]: {
      bg: "bg-pink-100",
      text: "text-pink-800",
      label: "MISSING",
    },
  };

  const config = statusConfig[status as Status.COMPLETED | Status.INCOMPLETE | Status.MISSING] || defaultConfig;

  return (
    <span
      className={`px-[10px] py-[2px] rounded-md ${config.bg} ${config.text} text-xs font-medium`}
    >
      {config.label}
    </span>
  );
};

export default StatusTag;

import React from "react";

interface LoaderProps {
  currentHours?: number;
  totalHours?: number;
  percentage?: number;
}

const Loader = ({ 
  currentHours = 20, 
  totalHours = 40, 
  percentage 
}: LoaderProps) => {
  // Calculate percentage if not provided
  const progressPercentage = percentage ?? (currentHours / totalHours) * 100;

  return (
    <div className="relative w-full">
      {/* Progress Bar Container */}
      <div className="relative w-full flex items-center gap-2">
        <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Filled Progress Section */}
          <div
            className="absolute left-0 top-0 h-full bg-orange-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* 100% Label */}
        <span className="text-sm text-gray-500 whitespace-nowrap">100%</span>
      </div>
    </div>
  );
};

export default Loader;

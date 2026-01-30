"use client";

import React, { useState, useRef, useEffect } from "react";
import { DropdownOption } from "@/utils/constants";

interface AppDropdownProps {
  data: DropdownOption[];
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  renderOption?: (option: DropdownOption) => React.ReactNode;
  renderSelected?: (option: DropdownOption | undefined) => React.ReactNode;
}

const AppDropdown = ({
  data,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  className = "",
  renderOption,
  renderSelected,
}: AppDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync selectedValue with defaultValue when it changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedValue(defaultValue);
    } else if (defaultValue === undefined && selectedValue !== undefined) {
      // Reset when defaultValue is cleared
      setSelectedValue(undefined);
    }
  }, [defaultValue]);

  // Find the selected option's label
  const selectedOption = data.find((item) => item.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string | number) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`w-full px-4 py-3 rounded-[8px] border bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-colors flex items-center justify-between cursor-pointer ${
          isOpen ? "border-primary-700" : "border-gray-300"
        }`}
      >
        {renderSelected ? (
          renderSelected(selectedOption)
        ) : (
          <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
            {displayText}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[8px] shadow-lg max-h-60 overflow-auto">
          {data.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelect(item.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(item.value);
                }
              }}
              tabIndex={0}
              role="option"
              aria-selected={selectedValue === item.value}
              className={`w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer flex items-center ${
                selectedValue === item.value ? "bg-gray-50" : ""
              }`}
            >
              {renderOption ? renderOption(item) : item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppDropdown;

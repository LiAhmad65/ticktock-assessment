"use client";

import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
  pageTitle: string;
  userName: string;
}

const Navbar = ({ pageTitle, userName }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav ref={menuRef} className="w-full min-h-[68px] bg-white flex items-center justify-between px-4 md:px-8 relative py-2 md:py-0">
      {/* Left side with grid - hidden on mobile, visible on md+ */}
      <div className="hidden md:grid md:grid-cols-2 gap-[32px] items-center">
        {/* First column - ticktock */}
        <div className="text-gray-900 font-semibold text-2xl">
          ticktock
        </div>
        
        {/* Second column - page title */}
        <div className="text-gray-900 font-medium text-sm">
          {pageTitle}
        </div>
      </div>

      {/* Mobile: ticktock and page title stacked */}
      <div className="md:hidden flex flex-col">
        <div className="text-gray-900 font-semibold text-2xl">
          ticktock
        </div>
        <div className="text-gray-900 font-normal text-xs">
          {pageTitle}
        </div>
      </div>

      {/* Right side - user name with down arrow - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-base font-medium text-gray-500">
          {userName}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500"
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

      {/* Mobile burger menu button */}
      <div
        className="md:hidden cursor-pointer"
        onClick={toggleMobileMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMobileMenu();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-900"
        >
          {isMobileMenuOpen ? (
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
          <div className="px-4 py-4">
            {/* User name */}
            <div className="flex items-center gap-2 py-2">
              <span className="text-base font-medium text-gray-500">
                {userName}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

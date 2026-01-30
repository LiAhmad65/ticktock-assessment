"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavbarProps {
  pageTitle: string;
  userName: string;
}

const Navbar = ({ pageTitle, userName }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isUserDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate to login page even if signOut fails
    router.push("/login");
    }
  };

  return (
    <nav ref={menuRef} className="sticky top-0 z-50 w-full min-h-[68px] bg-white flex items-center justify-between px-4 md:px-8  py-2 md:py-0">
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
      <div className="hidden md:block relative" ref={userDropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        >
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

        {/* User Dropdown */}
        {isUserDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[150px] z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M11 11.3333L14 8M14 8L11 4.66667M14 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
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
            {/* Logout button for mobile */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 py-2 text-red-500 text-sm font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M11 11.3333L14 8M14 8L11 4.66667M14 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

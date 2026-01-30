"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  
  // Map pathnames to page titles
  const getPageTitle = (path: string): string => {
    // Check if path is the timesheets list page
    if (path === "/timesheets") {
      return "Timesheets";
    }
    
    // Check if path is a week details page (e.g., /timesheets/week-1)
    if (path.startsWith("/timesheets/")) {
      return "Timesheets";
    }
    
    const titleMap: Record<string, string> = {
      "/week-time-sheet": "Week Timesheet",
      // Add more routes here as needed
    };
    return titleMap[path] || "Dashboard";
  };

  const pageTitle = getPageTitle(pathname);
  const userName = "John Doe"; // TODO: Get from auth context or props

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar pageTitle={pageTitle} userName={userName} />
      <div className="py-4 px-4 md:px-8 lg:px-[142px]">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;

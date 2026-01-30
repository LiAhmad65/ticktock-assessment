"use client";

import React, { useState, useRef, useEffect } from "react";
import AddNewTaskModal from "@/components/AddNewTaskModal/AddNewTaskModal";

interface Task {
  id: string;
  name: string;
  hours: number;
  projectName: string;
  projectId?: string;
  description?: string;
  taskName?: string;
  date?: string;
}

interface WeekTimeSheetRowProps {
  date: string; // ISO date format (YYYY-MM-DD)
  displayDate?: string; // Display format (e.g., "Jan 19")
  tasks?: Task[];
  onEntryAdded?: () => void; // Callback to refresh data after entry is added
}

const WeekTimeSheetRow = ({ date, displayDate, tasks = [], onEntryAdded }: WeekTimeSheetRowProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = (taskId: string) => {
    setOpenMenuId(openMenuId === taskId ? null : taskId);
  };

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsModalOpen(true);
    }
    setOpenMenuId(null);
  };

  const handleDelete = (taskId: string) => {
    console.log("Delete task:", taskId);
    setOpenMenuId(null);
    // Add delete logic here
  };

  const handleAddTask = (data: {
    project: string | number;
    typeOfWork: string | number;
    description: string;
    hours: number;
  }) => {
    console.log("Add task:", data);
    // Refresh data after entry is added
    if (onEntryAdded) {
      onEntryAdded();
    }
  };

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const createEditHandler = (taskId: string) => {
    return () => {
      handleEdit(taskId);
    };
  };

  const createDeleteHandler = (taskId: string) => {
    return () => {
      handleDelete(taskId);
    };
  };

  const createToggleMenuHandler = (taskId: string) => {
    return () => {
      toggleMenu(taskId);
    };
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-[108px_1fr] gap-4 sm:gap-[20px]">
      {/* Left side - Date */}
      <div className="flex items-start">
        <span className="text-gray-900 font-bold text-base sm:text-lg">{displayDate || date}</span>
      </div>

      {/* Right side - Task rows */}
      <div className="flex flex-col gap-2">
        {/* Task entries */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-gray-900 font-medium text-sm sm:text-base truncate">
                {task.name}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span className="text-gray-500 text-sm whitespace-nowrap">{task.hours} hrs</span>
              <div className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-md border border-primary-100 hover:bg-blue-100 transition-colors whitespace-nowrap">
                {task.projectName}
              </div>
              <div className="relative" ref={(el) => { menuRefs.current[task.id] = el; }}>
                <button
                  onClick={createToggleMenuHandler(task.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                  aria-label="More options"
                >
                  <svg
                    width="4"
                    height="16"
                    viewBox="0 0 4 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <circle cx="2" cy="3" r="1.5" fill="currentColor" />
                    <circle cx="2" cy="8" r="1.5" fill="currentColor" />
                    <circle cx="2" cy="13" r="1.5" fill="currentColor" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {openMenuId === task.id && (
                  <div className="absolute right-0 top-8 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px]">
                    <button
                      onClick={createEditHandler(task.id)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={createDeleteHandler(task.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add new task button */}
        <button
          onClick={handleOpenModal}
          className="w-full bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-700 p-3 sm:p-4 flex items-center justify-center gap-2 text-gray-700 hover:text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:text-primary-700 text-gray-700"
          >
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Add new task</span>
        </button>
      </div>

      {/* Add New Task Modal */}
      <AddNewTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTask}
        date={date}
        editData={editingTask}
      />
    </div>
  );
};

export default WeekTimeSheetRow;

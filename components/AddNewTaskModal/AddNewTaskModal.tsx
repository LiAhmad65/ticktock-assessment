"use client";

import React, { useState, useRef, useEffect } from "react";
import AppDropdown from "@/components/AppDropdown/AppDropdown";
import AppButton from "@/components/AppButton/AppButton";
import { DropdownOption } from "@/utils/constants";

interface AddNewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    project: string | number;
    typeOfWork: string | number;
    description: string;
    hours: number;
  }) => void;
}

const projectOptions: DropdownOption[] = [
  { label: "Project Name", value: "project1" },
  { label: "Project 2", value: "project2" },
  { label: "Project 3", value: "project3" },
];

const typeOfWorkOptions: DropdownOption[] = [
  { label: "Bug fixes", value: "bug_fixes" },
  { label: "Feature Development", value: "feature" },
  { label: "Code Review", value: "code_review" },
  { label: "Testing", value: "testing" },
];

interface FormLabelWithInfoProps {
  label: string;
  required?: boolean;
  showInfoIcon?: boolean;
}

const FormLabelWithInfo = ({ label, required = true, showInfoIcon = true }: FormLabelWithInfoProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {showInfoIcon && (
        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-[10px] text-gray-600 font-medium">i</span>
        </div>
      )}
    </div>
  );
};

const AddNewTaskModal = ({ isOpen, onClose, onAdd }: AddNewTaskModalProps) => {
  const [project, setProject] = useState<string | number>("");
  const [typeOfWork, setTypeOfWork] = useState<string | number>("bug_fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(12);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      project,
      typeOfWork,
      description,
      hours,
    });
    // Reset form
    setProject("");
    setTypeOfWork("bug_fixes");
    setDescription("");
    setHours(12);
    onClose();
  };

  const handleClose = () => {
    // Reset form on close
    setProject("");
    setTypeOfWork("bug_fixes");
    setDescription("");
    setHours(12);
    onClose();
  };

  const incrementHours = () => {
    setHours((prev) => prev + 1);
  };

  const decrementHours = () => {
    setHours((prev) => Math.max(0, prev - 1));
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Add New Entry</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="w-[80%] pb-6">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Select Project */}
              <div>
                <FormLabelWithInfo label="Select Project" />
                <AppDropdown
                  data={projectOptions}
                  defaultValue={project}
                  onChange={setProject}
                  placeholder="Project Name"
                />
              </div>

              {/* Type of Work */}
              <div>
                <FormLabelWithInfo label="Type of Work" />
                <AppDropdown
                  data={typeOfWorkOptions}
                  defaultValue={typeOfWork}
                  onChange={setTypeOfWork}
                  placeholder="Select type of work"
                />
              </div>

              {/* Task description */}
              <div>
                <FormLabelWithInfo label="Task description" showInfoIcon={false} />
                <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write text here ..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary-700 transition-colors resize-none overflow-hidden min-h-[100px]"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">A note for extra info</p>
              </div>

              {/* Hours */}
              <div>
                <FormLabelWithInfo label="Hours" showInfoIcon={false} />
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                  <button
                    type="button"
                    onClick={decrementHours}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors flex items-center justify-center border-r border-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                    className="w-16 px-2 py-2 text-sm text-gray-900 text-center focus:outline-none border-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={incrementHours}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors flex items-center justify-center border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
                  </form>
                  </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 p-4 border-t border-gray-200">
                <AppButton
                  type="submit"
                  variant="primary"
                  className="!h-[37px]"
                >
                  Add entry
                </AppButton>
                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  className="!h-[37px]"
                >
                  Cancel
                </AppButton>
              </div>
        </div>
      </div>
    </>
  );
};

export default AddNewTaskModal;
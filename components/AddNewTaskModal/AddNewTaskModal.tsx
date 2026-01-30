"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import AppDropdown from "@/components/AppDropdown/AppDropdown";
import AppButton from "@/components/AppButton/AppButton";
import { DropdownOption } from "@/utils/constants";
import api from "@/services/api";
import { endpoints } from "@/services/endpoints";
import { Project, CreateTimeEntryRequest, UpdateTimeEntryRequest } from "@/types/timesheet";

interface EditData {
  id: string;
  name: string;
  hours: number;
  projectName: string;
  projectId?: string;
  description?: string;
  taskName?: string;
  date?: string;
}

interface AddNewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    project: string | number;
    typeOfWork: string | number;
    description: string;
    hours: number;
  }) => void;
  date?: string; // Date for the entry (YYYY-MM-DD format)
  editData?: EditData | null; // Data for editing an existing entry
}

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

// Helper function to map taskName to typeOfWork value
const getTypeOfWorkFromTaskName = (taskName: string): string => {
  const taskNameMap: Record<string, string> = {
    "Bug fixes": "bug_fixes",
    "Feature Development": "feature",
    "Code Review": "code_review",
    "Testing": "testing",
  };
  return taskNameMap[taskName] || "bug_fixes";
};

const AddNewTaskModal = ({ isOpen, onClose, onAdd, date, editData }: AddNewTaskModalProps) => {
  const [project, setProject] = useState<string | number>("");
  const [typeOfWork, setTypeOfWork] = useState<string | number>("bug_fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(8);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [projects, setProjects] = useState<DropdownOption[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    project?: string;
    typeOfWork?: string;
    description?: string;
    hours?: string;
  }>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const response = await api.get<Project[]>(endpoints.projects.list);
      if (response.error) {
        console.error("Error fetching projects:", response.error);
        setProjects([]);
      } else if (response.data) {
        const projectOptions: DropdownOption[] = response.data.map((proj) => ({
          label: proj.name,
          value: proj.id,
        }));
        setProjects(projectOptions);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  // Fetch projects when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen, fetchProjects]);

  // Pre-populate form when editing (after projects are loaded)
  useEffect(() => {
    console.log('isOpen==>',isOpen)
    console.log('editData==>',editData)
    console.log('projects==>',projects)
    console.log('isLoadingProjects==>',isLoadingProjects)
    
    // Wait for projects to load before populating form
    if (isOpen && !isLoadingProjects) {
      if (editData) {
        // Set form values for editing
        const projectId = editData.projectId || "";
        const typeOfWorkValue = getTypeOfWorkFromTaskName(editData.taskName || editData.name);
        const descriptionValue = editData.description || "";
        const hoursValue = editData.hours || 8;
        
        console.log('Setting form values:', { projectId, typeOfWorkValue, descriptionValue, hoursValue });
        
        setProject(projectId);
        setTypeOfWork(typeOfWorkValue);
        setDescription(descriptionValue);
        setHours(hoursValue);
        setEntryId(editData.id);
      } else {
        // Reset form for new entry
        setProject("");
        setTypeOfWork("bug_fixes");
        setDescription("");
        setHours(8);
        setEntryId(null);
      }
    }
  }, [isOpen, editData, projects, isLoadingProjects]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!project) {
      newErrors.project = "Project is required";
    }

    if (!typeOfWork) {
      newErrors.typeOfWork = "Type of work is required";
    }

    if (!description || description.trim() === "") {
      newErrors.description = "Task description is required";
    }

    if (hours === undefined || hours === null) {
      newErrors.hours = "Hours is required";
    } else if (hours < 0) {
      newErrors.hours = "Hours must be greater than or equal to 0";
    } else if (hours > 24) {
      newErrors.hours = "Hours cannot exceed 24";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Get the entry date (use provided date or today)
      const entryDate = date || new Date().toISOString().split('T')[0];

      // Map typeOfWork to taskName
      const taskNameMap: Record<string, string> = {
        bug_fixes: "Bug fixes",
        feature: "Feature Development",
        code_review: "Code Review",
        testing: "Testing",
      };
      const taskName = taskNameMap[typeOfWork as string] || (typeOfWork as string);

      // Create or update time entry request
      if (entryId) {
        // Update existing entry
        const updateRequest: UpdateTimeEntryRequest = {
          id: entryId,
          projectId: project as string,
          taskName,
          description: description.trim(),
          date: entryDate,
          hours: hours,
        };

        const updateResponse = await api.put(endpoints.timeEntries.update(entryId), updateRequest);

        if (updateResponse.error) {
          setErrors({ description: updateResponse.error });
          return;
        }
      } else {
        // Create new entry
        const request: CreateTimeEntryRequest = {
          projectId: project as string,
          taskName,
          description: description.trim(),
          date: entryDate,
          hours: hours,
        };

        const createResponse = await api.post(endpoints.timeEntries.create, request);

        if (createResponse.error) {
          setErrors({ description: createResponse.error });
          return;
        }
      }

      // Call the onAdd callback with the form data
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
      setHours(8);
      setEntryId(null);
      setErrors({});
      onClose();
    } catch (err) {
      setErrors({
        description: err instanceof Error ? err.message : "Failed to create time entry",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset form on close
    setProject("");
    setTypeOfWork("bug_fixes");
    setDescription("");
    setHours(8);
    setErrors({});
    onClose();
  };

  const incrementHours = () => {
    setHours((prev) => Math.min(24, prev + 1));
  };

  const decrementHours = () => {
    setHours((prev) => Math.max(0, prev - 1));
  };

  if (!isOpen) return null;

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
            <h2 className="text-xl font-bold text-gray-900">
              {entryId ? "Edit Entry" : "Add New Entry"}
            </h2>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Select Project */}
              <div>
                <FormLabelWithInfo label="Select Project" />
                <AppDropdown
                  key={`project-${project}-${projects.length}`}
                  data={projects}
                  defaultValue={project}
                  onChange={setProject}
                  placeholder={isLoadingProjects ? "Loading projects..." : "Project Name"}
                />
                {errors.project && (
                  <p className="mt-1 text-xs text-red-500">{errors.project}</p>
                )}
              </div>

              {/* Type of Work */}
              <div>
                <FormLabelWithInfo label="Type of Work" />
                <AppDropdown
                  key={`typeOfWork-${typeOfWork}`}
                  data={typeOfWorkOptions}
                  defaultValue={typeOfWork}
                  onChange={setTypeOfWork}
                  placeholder="Select type of work"
                />
                {errors.typeOfWork && (
                  <p className="mt-1 text-xs text-red-500">{errors.typeOfWork}</p>
                )}
              </div>

              {/* Task description */}
              <div>
                <FormLabelWithInfo label="Task description" showInfoIcon={false} />
                <textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors((prev) => ({ ...prev, description: undefined }));
                    }
                  }}
                  placeholder="Write text here ..."
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none transition-colors resize-none overflow-hidden min-h-[100px] ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-primary-700"
                  }`}
                />
                <p className="mt-1 text-xs text-gray-500">A note for extra info</p>
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
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
                    onChange={(e) => {
                      const value = Math.max(0, Math.min(24, parseInt(e.target.value) || 0));
                      setHours(value);
                      if (errors.hours) {
                        setErrors((prev) => ({ ...prev, hours: undefined }));
                      }
                    }}
                    min="0"
                    max="24"
                    className={`w-16 px-2 py-2 text-sm text-gray-900 text-center focus:outline-none border-0 ${
                      errors.hours ? "text-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={incrementHours}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors flex items-center justify-center border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
                {errors.hours && (
                  <p className="mt-1 text-xs text-red-500">{errors.hours}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <AppButton
                  type="submit"
                  variant="primary"
                  className="!h-[37px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || isLoadingProjects}
                >
                  {entryId ? "Update entry" : "Add entry"}
                </AppButton>
                <AppButton
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  className="!h-[37px]"
                  disabled={isSubmitting}
                >
                  Cancel
                </AppButton>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default AddNewTaskModal;
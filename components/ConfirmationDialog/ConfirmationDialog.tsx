"use client";

import React from "react";
import AppButton from "@/components/AppButton/AppButton";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmationDialogProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 text-sm">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 p-6 border-t border-gray-200">
            <AppButton
              type="button"
              variant="primary"
              onClick={handleConfirm}
              className="!h-[37px]"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {confirmText}
            </AppButton>
            <AppButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="!h-[37px]"
              disabled={isLoading}
            >
              {cancelText}
            </AppButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;

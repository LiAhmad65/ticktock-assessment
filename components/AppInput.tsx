import React from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
}

export default function AppInput({
  title,
  placeholder,
  className = "",
  ...props
}: AppInputProps) {
  return (
    <div className="w-full">
      {title && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {title}
        </label>
      )}
      <input
        type={props.type || "text"}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:border-primary-700 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}

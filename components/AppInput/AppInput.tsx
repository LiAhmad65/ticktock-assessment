import React from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  error?: string;
}

const AppInput = ({
  title,
  placeholder,
  className = "",
  error,
  ...props
}: AppInputProps) => {
  const hasError = !!error;
  
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
        className={`w-full px-4 py-3 rounded-lg border ${
          hasError 
            ? "border-red-500 focus:border-red-500" 
            : "border-gray-300 focus:border-primary-700"
        } text-sm text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:outline-none transition-colors ${className}`}
        {...props}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default AppInput;

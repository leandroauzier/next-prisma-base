"use client";

import React from "react";

type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  variant = "default",
  size = "md",
  fullWidth = true,
  disabled = false,
  className = "",
}: InputProps) {
  const baseStyles =
    "rounded-md border focus:outline-none focus:ring-2 transition-all";

  const variantStyles: Record<InputVariant, string> = {
    default: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    error: "border-red-500 focus:ring-red-500 focus:border-red-500",
    success: "border-green-500 focus:ring-green-500 focus:border-green-500",
  };

  const sizeStyles: Record<InputSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
      />
    </div>
  );
}

"use client";

import React from "react";

type SelectVariant = "default" | "error" | "success";
type SelectSize = "sm" | "md" | "lg";

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  variant?: SelectVariant;
  size?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  variant = "default",
  size = "md",
  fullWidth = true,
  disabled = false,
  className = "",
  required = false,
}: SelectProps) {
  const baseStyles =
    "rounded-md border focus:outline-none focus:ring-2 transition-all bg-white";

  const variantStyles: Record<SelectVariant, string> = {
    default: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    error: "border-red-500 focus:ring-red-500 focus:border-red-500",
    success: "border-green-500 focus:ring-green-500 focus:border-green-500",
  };

  const sizeStyles: Record<SelectSize, string> = {
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        required={required}
      >
        <option value="" disabled>
          Selecione...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

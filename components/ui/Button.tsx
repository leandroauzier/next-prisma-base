"use client";

import React from "react";

type Variant = "primary" | "secondary" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Button({
  label,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  icon,
  children,
}: ButtonProps) {
  const baseStyles =
    "select-none flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";

  const variantStyles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
  };

  const sizeStyles: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {icon && <span className={`${label ? 'mr-2' : 'mr-0'}`}>{icon}</span>}
      {label}
    </button>
  );
}

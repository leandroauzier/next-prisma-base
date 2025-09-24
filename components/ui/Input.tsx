"use client";

import React from "react";
import { maskCPF, maskPhone, maskCEP } from "@/utils/masks";

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
  required?: boolean;
  minLenght?: number;
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
  required = false,
  minLenght,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (type === "cpf") e.target.value = maskCPF(e.target.value);
    if (type === "phone") e.target.value = maskPhone(e.target.value);
    if (type === "cep") e.target.value = maskCEP(e.target.value);

    onChange?.(e);
  }

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
        type={["cpf", "phone", "cep"].includes(type) ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={classes}
        required={required}
        minLength={minLenght}
      />
    </div>
  );
}

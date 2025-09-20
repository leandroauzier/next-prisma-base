import React from "react";

type CardProps = {
  title: string;
  value?: string | number;
  color?: "blue" | "green" | "purple" | "red" | "gray";
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const colors: Record<string, string> = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  red: "text-red-600",
  gray: "text-gray-600",
};

export default function Card({
  title,
  value,
  color = "blue",
  description,
  icon,
  children,
  className = "",
}: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      {value !== undefined && (
        <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
      )}

      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

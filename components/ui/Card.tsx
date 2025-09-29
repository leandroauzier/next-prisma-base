import { textColors } from "@/utils/tailwindMaps";
import React from "react";

type CardProps = {
  title: string;
  value?: string | number;
  color?: keyof typeof textColors
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  value,
  color = "blue500",
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
        <p className={`text-3xl font-bold ${textColors[color]}`}>
          {value}
        </p>
      )}

      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

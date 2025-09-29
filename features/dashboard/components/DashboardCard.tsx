"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { bgColors } from "@/utils/tailwindMaps";

type DashboardCardProps = {
  title: string;
  type: "number" | "text" | "table" | "chart";
  value?: string | number;
  description?: string;
  color?: keyof typeof bgColors,
  data?: {
    headers: string[];
    rows: (string | number)[][];
  };
  sortBy?: number;
  sortDir?: "asc" | "desc";
};

export default function DashboardCard({
  title,
  type,
  value,
  description,
  color = "blue500",
  data,
  sortBy,
  sortDir = "desc"
}: DashboardCardProps) {
  if (type === "number") {
    return <Card title={title} value={value ?? "-"} description={description} />;
  }

  if (type === "text") {
    return (
      <Card
        title={title}
        value={value ?? "-"}
        description={description}
        color="gray500"
      />
    );
  }

  if (type === "table") {
    let rows = data?.rows ?? [];
    if (typeof sortBy === "number" && rows.length > 0) {
      rows = [...rows].sort((a, b) => {
        const valorA = a[sortBy] ?? "";
        const valorB = b[sortBy] ?? "";

        if (typeof valorA === "number" && typeof valorB === "number") {
          return sortDir === "asc" ? valorA - valorB : valorB - valorA;
        }

        return sortDir === "desc"
          ? String(valorA).localeCompare(String(valorB))
          : String(valorB).localeCompare(String(valorA));
      });
    }
    return (
      <Card title={title} value="">
        <table className="w-full text-sm text-gray-700 mt-2">
          <thead>
            <tr>
              {data?.headers?.map((h: string, i: number) => (
                <th key={i} className="text-left border-b py-1">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="py-1 border-b">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }

  if (type === "chart") {
    return (
      <Card title={title} value="">
        {/* Exemplo fake: gráfico de barras simples */}
        <div className="mt-4 h-24 flex items-end gap-2">
          {data?.rows?.map((value, i) => (
            <div
              key={i}
              className="bg-blue-500 rounded"
              style={{ height: `${value}%`, width: "20%" }}
              title={`Valor: ${value}`}
            />
          ))}
        </div>
      </Card>
    );
  }

  return null;
}

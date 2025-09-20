"use client";

import React from "react";
import Card from "@/components/ui/Card";

type DashboardCardProps = {
  title: string;
  type: "number" | "text" | "table" | "chart";
  value?: string | number;
  description?: string;
  data?: any; // pode ser gráfico, linhas da tabela, etc.
};

export default function DashboardCard({
  title,
  type,
  value,
  description,
  data,
}: DashboardCardProps) {
  if (type === "number") {
    return <Card title={title} value={value ?? "-"} description={description} />;
  }

  if (type === "text") {
    return (
      <Card
        title={title}
        value={value ?? ""}
        description={description}
        color="gray"
      />
    );
  }

  if (type === "table") {
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
            {data?.rows?.map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="py-1 border-b">{cell}</td>
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
          {data?.map((v: number, i: number) => (
            <div
              key={i}
              className="bg-blue-500 rounded"
              style={{ height: `${v}%`, width: "20%" }}
              title={`Valor: ${v}`}
            />
          ))}
        </div>
      </Card>
    );
  }

  return null;
}

"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";

type PieChartCardProps = {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
  colors?: string[];
};

export default function PieChartCard({
  title,
  description,
  data,
  colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"],
}: PieChartCardProps) {
  return (
    <Card title={title} description={description}>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

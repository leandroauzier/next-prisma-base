"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";

type BarChartCardProps = {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
  color?: string;
};

export default function BarChartCard({
  title,
  description,
  data,
  color = "#10b981",
}: BarChartCardProps) {
  return (
    <Card title={title} description={description}>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

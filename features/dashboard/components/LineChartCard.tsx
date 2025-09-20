"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";

type LineChartCardProps = {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
  color?: string;
};

export default function LineChartCard({
  title,
  description,
  data,
  color = "#2563eb",
}: LineChartCardProps) {
  return (
    <Card title={title} description={description}>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

"use client";

import Card from "@/components/ui/Card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineChartCardProps = {
  title: string;
  description?: string;
  color?: string;
  data: { name: string; value: number }[];
};

export default function LineChartCard({
  title,
  description,
  color = "#2563eb",
  data,
}: LineChartCardProps) {
  return (
    <Card title={title} description={description}>
      <div className="w-full h-64 flex items-center justify-center">
        {data.length === 0 ? (
          <div className="text-gray-400">Sem dados para exibir</div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="value"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR")
                }
              />
              <YAxis hide />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value as number).toLocaleString("pt-BR")
                }
                formatter={(_, __, entry) => [`${entry.payload.name}`, "Usuário"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

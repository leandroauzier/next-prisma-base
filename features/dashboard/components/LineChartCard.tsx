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
import { useEffect, useState, useCallback } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import Button from "@/components/ui/Button";

type LineChartCardProps = {
  title: string;
  description?: string;
  apiUrl: string;
  color?: string;
};

export default function LineChartCard({
  title,
  description,
  apiUrl,
  color = "#2563eb",
}: LineChartCardProps) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback evita recriar a função a cada render
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card title={title} description={description}>
      <div className="w-full h-64 flex items-center justify-center">
        {loading ? (
          <div className="animate-pulse text-gray-400">
            Carregando gráfico...
          </div>
        ) : error ? (
          <div className="flex-col justify-center items-center flex space-y-4">
            <p className="text-gray-500">
              Não foi possivel carregar os dados
            </p>
            <Button label="Tentar novamente" onClick={fetchData} />
          </div>
        ) : (
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

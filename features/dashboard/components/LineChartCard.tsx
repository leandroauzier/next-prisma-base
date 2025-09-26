"use client";

import { getLastActiveUsers } from "@/app/actions/user";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { parseDate } from "@/utils/Date/parseDate";
import { useCallback, useEffect, useState } from "react";
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
      const usuarios = await getLastActiveUsers();

      const formatado = usuarios.map((u) => ({
        name: u.nome,
        value: parseDate(u.criadoEm).getTime(),
      }))
      setData(formatado);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

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
              <XAxis
                dataKey="value"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => new Date(value).toLocaleDateString("pt-BR")}
              />
              <YAxis hide /> {/* se não quiser nada no Y */}
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value as number).toLocaleString("pt-BR")
                }
                formatter={(_, __, entry) => [`${entry.payload.name}`, "Usuário"]}
              />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} />
            </LineChart>

          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

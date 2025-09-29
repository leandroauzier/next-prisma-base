"use client";

import { useEffect, useState } from "react";
import DashboardSection from "@/features/dashboard/components/DashboardSection";
import DashboardCard from "@/features/dashboard/components/DashboardCard";
import PieChartCard from "@/features/dashboard/components/PieChartCard";
import LineChartCard from "@/features/dashboard/components/LineChartCard";
import { parseDate } from "@/utils/Date/parseDate";
import { getUserDashboardData } from "@/features/dashboard/actions/userdashboard";

type DashboardClientProps = {
  initialData: {
    total: number;
    ativos: any[];
    inativos: any[];
  };
};

export default function DashboardClient({ initialData }: DashboardClientProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Exemplo: polling a cada 30 segundos
    const interval = setInterval(async () => {
      const fresh = await getUserDashboardData();
      setData(fresh);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const lineData = data.ativos.map((u) => ({
    name: u.nome,
    value: parseDate(u.criadoEm).getTime(),
  }));

  const ultimoLoginData = data.ativos.map((u) => [
    u.nome,
    new Date(u.ultimoLogin ?? u.atualizadoEm).toLocaleString("pt-BR"),
  ]);

  const userStatus = [
    { name: "Ativos", value: data.ativos.length },
    { name: "Inativos", value: data.inativos.length },
  ];

  return (
    <DashboardSection
      title="Informações de usuários"
      cols={2}
      rounded="lg"
      bgColor="gray200"
    >
      <DashboardCard
        type="number"
        title="Usuários"
        value={data.total}
        description="Total de usuários cadastrados"
      />
      <DashboardCard
        type="number"
        title="Usuários Inativos"
        value={data.inativos.length}
        color="red500"
        description="Número de usuários inativos"
      />
      <PieChartCard
        title="Status dos Usuários"
        description="Distribuição atual"
        data={userStatus}
      />
      <LineChartCard
        title="Cadastros Recentes"
        description="Últimos 10 usuários"
        data={lineData}
      />
      <DashboardCard
        type="table"
        title="Últimos Logins"
        data={{
          headers: ["Usuário", "Data"],
          rows: ultimoLoginData,
        }}
        sortBy={1}
        sortDir="asc"
      />
    </DashboardSection>
  );
}

"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/features/dashboard/components/DashboardCard";
import LineChartCard from "@/features/dashboard/components/LineChartCard";
import BarChartCard from "@/features/dashboard/components/BarChartCard";
import PieChartCard from "@/features/dashboard/components/PieChartCard";

import { getRecentlyCreatedUsers } from "@/app/actions/user";
import { parseDate } from "@/utils/Date/parseDate";
import DashboardSection from "@/features/dashboard/components/DashboardSection";


export default function Dashboard() {
  const [lineData, setLineData] = useState<{ name: string; value: number }[]>([])
  const [ultimoLoginData, setUltimoLoginData] = useState<string[][]>([])

  useEffect(() => {
    (async () => {
      const usuarios = await getRecentlyCreatedUsers();

      const criadoFormatado = usuarios.map((u) => ({
        name: u.nome,
        value: parseDate(u.criadoEm).getTime(),
      }));

      const loginFormatado = usuarios.map((u) => [
        u.nome,
        new Date(
          u.ultimoLogin ? u.ultimoLogin : u.atualizadoEm
        ).toLocaleString("pt-BR"),
      ]);

      setLineData(criadoFormatado);
      setUltimoLoginData(loginFormatado);
    })();
  }, []);


  const barData = [
    { name: "Curso A", value: 40 },
    { name: "Curso B", value: 80 },
    { name: "Curso C", value: 65 },
  ];

  const pieData = [
    { name: "Ativos", value: 400 },
    { name: "Inativos", value: 200 },
    { name: "Pendentes", value: 150 },
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Visão geral do sistema</p>

      <DashboardSection
        title="Acesso de usuários"
        cols={2}
        rounded="lg"
        bgColor="gray200"
      >
        <LineChartCard
          title="Cadastros Recentes"
          description="Ultimos 10 usuários"
          data={lineData}
        />
        <DashboardCard
          type="table"
          title="Últimos Logins"
          data={{
            headers: ["Usuário", "Data"],
            rows: ultimoLoginData,
          }}
        />
      </DashboardSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <BarChartCard
          title="Inscrições por Curso"
          description="Top 3 cursos"
          data={barData}
        />
        <PieChartCard
          title="Status dos Usuários"
          description="Distribuição atual"
          data={pieData}
        />
        <DashboardCard
          type="number"
          title="Usuários"
          value="1.245"
          description="+12% desde o mês passado"
        />
        <DashboardCard
          type="chart"
          title="Atividade"
          data={[20, 50, 80, 40, 70]}
        />
      </div>
    </div>
  );
}

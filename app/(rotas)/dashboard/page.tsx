"use client";

import DashboardCard from "@/features/dashboard/components/DashboardCard";
import LineChartCard from "@/features/dashboard/components/LineChartCard";
import BarChartCard from "@/features/dashboard/components/BarChartCard";
import PieChartCard from "@/features/dashboard/components/PieChartCard";


export default function Dashboard() {

  const lineData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
  ];

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Visão geral do sistema</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LineChartCard
          title="Usuários Ativos"
          description="Últimos 5 meses"
          // data={lineData}
          apiUrl=""
        />
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
        <DashboardCard
          type="table"
          title="Últimos Logins"
          data={{
            headers: ["Usuário", "Data"],
            rows: [
              ["Ana", "2025-09-10"],
              ["Carlos", "2025-09-12"],
              ["João", "2025-09-14"],
            ],
          }}
        />
      </div>
    </div>
  );
}

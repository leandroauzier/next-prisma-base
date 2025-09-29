// app/(public)/dashboard/page.tsx
import DashboardClient from "./dashboardClient";
import { getUserDashboardData } from "@/features/dashboard/actions/userdashboard";

export default async function DashboardPage() {
  const { total, ativos, inativos } = await getUserDashboardData();

  return (
    <DashboardClient
      initialData={{
        total,
        ativos,
        inativos,
      }}
    />
  );
}

// app/(public)/dashboard/page.tsx
import { getUserDashboardData } from "@/features/dashboard/actions/userdashboard";
import DocParserClient from "./docparserClient";

export default async function DocParser() {
  const { total, ativos, inativos } = await getUserDashboardData();

  return (
    <DocParserClient
    />
  );
}

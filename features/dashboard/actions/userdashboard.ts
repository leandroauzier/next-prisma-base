import { getActiveUsers, getInactiveUsers } from "@/app/actions/user";

export async function getUserDashboardData() {
  const usuariosAtivos = await getActiveUsers();
  const usuariosInativos = await getInactiveUsers();

  return {
    total: usuariosAtivos.length + usuariosInativos.length,
    ativos: usuariosAtivos,
    inativos: usuariosInativos,
  };
}

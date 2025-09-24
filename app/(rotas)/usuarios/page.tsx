import { getUsers } from "@/features/usuarios/services/userService";
import UserList from "@/features/usuarios/components/UserList";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Usuários</h1>
      <UserList users={users} />
    </div>
  );
}

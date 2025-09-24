"use client";

import Button from "@/components/ui/Button";
import { canDelete } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteUser, SafeUser } from "../services/userService";
import Swal from "sweetalert2";

export default function UserList({ users }: { users: SafeUser[] }) {
  const router = useRouter();
  const { data: session } = useSession();

  const currentRole = (session?.user?.role ?? "USER").toUpperCase() as
    | "DEV"
    | "ADMIN"
    | "USER";

  async function handleDelete(userId: string, userRole: string) {

    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      Swal.fire({
        icon: "error",
        title: "Sessão inválida",
        text: "Não foi possível identificar o usuário logado.",
      });
      return;
    }
    if (userId === currentUserId) {
      Swal.fire({
        icon: "warning",
        title: "Você não pode excluir a si mesmo!",
      });
      return;
    }

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita.",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      const result = await deleteUser(currentUserId, userId);
      Swal.fire({
        icon: "success",
        title: result.message,
        timer: 1500,
        showConfirmButton: false,
      });
      router.refresh();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro interno",
        text: err.message ?? "Não foi possível excluir o usuário.",
      });
    }
  }

  return (
    <div className="w-full">
      {/* Tabela desktop */}
      <table className="hidden md:table border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Nome</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{u.nome}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1 flex gap-2">
                <Button
                  label="Editar"
                  onClick={() => router.push(`/users/${u.id}`)}
                  className="text-blue-500"
                />
                {canDelete(currentRole, (u.role as any) ?? "USER") && (
                  <Button
                    label="Deletar"
                    onClick={() => handleDelete(u.id, u.role)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

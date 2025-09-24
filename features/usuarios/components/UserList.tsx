"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { canDelete } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteUser, SafeUser } from "../services/userService";
import Swal from "sweetalert2";
import UserModal from "./UserModal"; // modal de criação

export default function UserList({ users }: { users: SafeUser[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentRole = (session?.user?.perfil ?? "USUARIO").toUpperCase() as
    | "DESENVOLVEDOR"
    | "ADMINISTRADOR"
    | "USUARIO";

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
      {/* Header com botão de novo usuário */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Lista de Usuários</h2>
        <Button
          label="Novo Usuário"
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        />
      </div>

      {/* Modal de criação */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => router.refresh()}
      />

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
                  onClick={() => router.push(`/usuarios/${u.id}`)}
                  className="text-blue-500"
                />
                {canDelete(currentRole, (u.perfil as any) ?? "USUARIO") && (
                  <Button
                    label="Deletar"
                    onClick={() => handleDelete(u.id, u.perfil)}
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

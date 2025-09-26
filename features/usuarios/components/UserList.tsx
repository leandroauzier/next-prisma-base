"use client";

import Button from "@/components/ui/Button";
import { canDelete } from "@/lib/permissions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { softDeleteUserAction, deleteUserAction, restoreDeletedUserAction } from "@/app/actions/user";
import { SafeUser } from "../services/userService";
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
      const result = await deleteUserAction(currentUserId, userId);
      Swal.fire({
        icon: "success",
        title: "Usuário Deletado com sucesso",
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
  async function handleSoftDelete(userId: string, userRole: string) {
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
        title: "Você não pode Desabilitar a si mesmo!",
      });
      return;
    }

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "O usuário ficará com o s status: Desabilitado",
      showCancelButton: true,
      confirmButtonText: "Sim, Desabilitar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await softDeleteUserAction(userId)
      Swal.fire({
        icon: "success",
        title: "Usuário Desabilitado com sucesso",
        timer: 1500,
        showConfirmButton: false,
      });
      router.refresh();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro interno",
        text: err.message ?? "Não foi possível Desabilitado o usuário.",
      });
    }
  }
  async function handleRestore(userId: string, userRole: string) {
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
        title: "Você não pode restaurar a si mesmo!",
      });
      return;
    }

    const confirm = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      showCancelButton: true,
      confirmButtonText: "Sim, Restaurar usuário",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await restoreDeletedUserAction(userId)
      Swal.fire({
        icon: "success",
        title: "Usuário Restaurado com sucesso",
        timer: 1500,
        showConfirmButton: false,
      });
      router.refresh();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro interno",
        text: err.message ?? "Não foi possível restaurar o usuário.",
      });
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Lista de Usuários</h2>
        <Button
          label="Novo Usuário"
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          router.refresh();
        }}
      />


      {/* Tabela desktop */}
      <table className="hidden md:table border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Nome</th>
            <th className="border px-2 py-1 text-left">Perfil</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Habilitado</th>
            <th className="border px-2 py-1 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isDisabled = u.deletadoEm !== null;

            return (
              <tr
                key={u.id}
                className={`hover:bg-gray-50 ${isDisabled ? "opacity-50 bg-gray-300 hover:bg-gray-300" : ""
                  }`}
              >
                <td className="border px-2 py-1">{u.nome}</td>
                <td className="border px-2 py-1">{u.perfil}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">
                  {isDisabled ? (
                    <span className="text-red-600 font-semibold">Não</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Sim</span>
                  )}
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  <Button
                    label="Editar"
                    onClick={() => router.push(`/usuarios/${u.id}`)}
                    className="text-blue-500"
                    disabled={isDisabled}
                  />

                  {canDelete(currentRole, (u.perfil as any) ?? "USUARIO") && (
                    <Button
                      label="Deletar"
                      onClick={() => handleDelete(u.id, u.perfil)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    />
                  )}

                  {canDelete(currentRole, (u.perfil as any) ?? "USUARIO") &&
                    (isDisabled ? (
                      <Button
                        label="Restaurar"
                        onClick={() => handleRestore(u.id, u.perfil)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      />
                    ) : (
                      <Button
                        label="Desabilitar"
                        onClick={() => handleSoftDelete(u.id, u.perfil)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      />
                    ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div >
  );
}

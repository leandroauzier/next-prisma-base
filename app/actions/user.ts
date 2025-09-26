// app/actions/user.ts
"use server";

import { revalidatePath } from "next/cache";
import { Perfil } from "@prisma/client";
import {
  registerUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  softDeleteUser,
  restoreUser,
  getUserByDate,
} from "@/features/usuarios/services/userService";

// POST ACTION
export async function createUserAction(data: {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  perfil?: string;
}) {
  const newUser = await registerUser(data);
  revalidatePath("/usuarios"); // Atualiza lista de usuários
  return newUser;
}

// PUT ACTION
export async function updateUserAction(
  id: string,
  data: Partial<{
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone?: string;
    perfil?: string;
  }>
) {
  const fixedData = {
    ...data,
    perfil: data.perfil ? (Perfil[data.perfil as keyof typeof Perfil]) : undefined,
  };

  const updatedUser = await updateUser(id, fixedData);
  revalidatePath("/usuarios");
  return updatedUser;
}

// SOFT DELETE ACTION
export async function softDeleteUserAction(targetUserId: string) {
  const result = await softDeleteUser(targetUserId);
  revalidatePath("/usuarios");
  return result;
}
// RESTORE DELETE ACTION
export async function restoreDeletedUserAction(targetUserId: string) {
  const result = await restoreUser(targetUserId);
  revalidatePath("/usuarios");
  return result;
}
// DELETE ACTION
export async function deleteUserAction(currentUserId: string, targetUserId: string) {
  const result = await deleteUser(currentUserId, targetUserId);
  revalidatePath("/usuarios");
  return result;
}

// Helpers para páginas (se você precisar)
export { getUsers, getUserById };

// =========================================================================================

export async function getRecentlyCreatedUsers(){
  const users = await getUserByDate();
  return users.filter((u) => u.deletadoEm === null)
  .slice(0, 10);
}

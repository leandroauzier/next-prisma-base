import { canDelete } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { Prisma, Perfil } from "@prisma/client";
import { hash } from "bcryptjs";

// Tipos derivados do Prisma
export type PrismaUser = Awaited<ReturnType<typeof prisma.usuario.findFirst>>;
export type SafeUser = Omit<NonNullable<PrismaUser>, "senha">;

type UpdateUserInput = Partial<{
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
  perfil: Perfil;
}>;

function sanitizeUser(user: PrismaUser): SafeUser | null {
  if (!user) return null;
  const { senha, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(data: {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
}) {
  const hashedsenha = await hash(data.senha, 10);

  const user = await prisma.usuario.create({
    data: { ...data, senha: hashedsenha },
  });

  return sanitizeUser(user)!;
}

export async function getUsers(): Promise<SafeUser[]> {
  const users = await prisma.usuario.findMany({
    orderBy: { criadoEm: "desc" },
  });
  return users.map((u: any) => sanitizeUser(u)!);
}
export async function getLastCreatedUsers() {
  return prisma.usuario.findMany({
    orderBy: { criadoEm: "desc" },
    select: {
      nome: true,
      deletadoEm: true,
      criadoEm: true,
    }
  });
}

export async function getUserById(id: string): Promise<SafeUser | null> {
  const user = await prisma.usuario.findUnique({ where: { id } });
  return sanitizeUser(user);
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const data: Prisma.UsuarioUpdateInput = {};

  if (input.nome !== undefined) data.nome = input.nome;
  if (input.email !== undefined) data.email = input.email;
  if (input.cpf !== undefined) data.cpf = input.cpf;
  if (input.telefone !== undefined) data.telefone = input.telefone;
  if (input.perfil !== undefined) data.perfil = input.perfil;

  if (input.senha) {
    data.senha = await hash(input.senha, 10);
  }

  const user = await prisma.usuario.update({
    where: { id },
    data,
  });

  const { senha, ...safeUser } = user;
  return safeUser;
}
export async function softDeleteUser(userId: string) {
  const user = await prisma.usuario.update({
    where: { id: userId },
    data: {
      deletadoEm: new Date(),
    }
  });

  const { senha, ...safeUser } = user;
  return safeUser;
}
export async function restoreUser(id: string) {
  const user = await prisma.usuario.update({
    where: { id },
    data: {
      deletadoEm: null,
    },
  });

  const { senha, ...safeUser } = user;
  return safeUser;
}


export async function deleteUser(currentUserId: string, targetUserId: string) {
  const currentUser = await prisma.usuario.findUnique({
    where: { id: currentUserId },
    select: { id: true, perfil: true },
  });

  if (!currentUser) {
    throw new Error("Usuário autenticado não encontrado.");
  }

  const targetUser = await prisma.usuario.findUnique({
    where: { id: targetUserId },
    select: { id: true, perfil: true },
  });

  if (!targetUser) {
    throw new Error("Usuário a ser deletado não encontrado.");
  }

  const isAllowed = canDelete(currentUser.perfil as any, targetUser.perfil as any);

  if (!isAllowed) {
    throw new Error("Você não tem permissão para excluir este usuário.");
  }

  await prisma.usuario.delete({ where: { id: targetUserId } });

  return { message: "Usuário deletado com sucesso" };
}

export async function createUser(data: {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  perfil: string;
}) {
  const res = await fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao criar usuário");
  }

  return res.json();
}


import { canDelete } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { Prisma, Role } from "@prisma/client";
import { hash } from "bcryptjs";

// Tipos derivados do Prisma
export type PrismaUser = Awaited<ReturnType<typeof prisma.user.findFirst>>;
export type SafeUser = Omit<NonNullable<PrismaUser>, "password">;

type UpdateUserInput = Partial<{
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  password: string;
  role: Role;
}>;

function sanitizeUser(user: PrismaUser): SafeUser | null {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(data: {
  nome: string;
  email: string;
  password: string;
  cpf: string;
  telefone?: string;
}) {
  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  return sanitizeUser(user)!;
}

export async function getUsers(): Promise<SafeUser[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return users.map((u: any) => sanitizeUser(u)!);
}

export async function getUserById(id: string): Promise<SafeUser | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return sanitizeUser(user);
}

export async function updateUser(id: string, input: UpdateUserInput) {
  const data: Prisma.UserUpdateInput = {};

  if (input.nome !== undefined) data.nome = input.nome;
  if (input.email !== undefined) data.email = input.email;
  if (input.cpf !== undefined) data.cpf = input.cpf;
  if (input.telefone !== undefined) data.telefone = input.telefone;
  if (input.role !== undefined) data.role = input.role;

  if (input.password) {
    data.password = await hash(input.password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  const { password, ...safeUser } = user;
  return safeUser;
}

export async function deleteUser(currentUserId: string, targetUserId: string) {
  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
    select: { id: true, role: true },
  });

  if (!currentUser) {
    throw new Error("Usuário autenticado não encontrado.");
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, role: true },
  });

  if (!targetUser) {
    throw new Error("Usuário a ser deletado não encontrado.");
  }

  const isAllowed = canDelete(currentUser.role as any, targetUser.role as any);

  if (!isAllowed) {
    throw new Error("Você não tem permissão para excluir este usuário.");
  }

  await prisma.user.delete({ where: { id: targetUserId } });

  return { message: "Usuário deletado com sucesso" };
}

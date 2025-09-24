// app/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";

export async function registerUser(data: { cpf: string; nome: string; email: string; password: string; telefone: string, role?: string }) {
  const hashedPassword = await hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: data.role ? (Role[data.role as keyof typeof Role]) : Role.USER,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      role: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      cpf: true,
      nome: true,
      email: true,
      telefone: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}


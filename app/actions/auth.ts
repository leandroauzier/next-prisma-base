// app/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import { Perfil } from "@prisma/client";
import { hash } from "bcryptjs";

export async function registerUser(data: { cpf: string; nome: string; email: string; senha: string; telefone: string, perfil?: string }) {
  const hashedsenha = await hash(data.senha, 10);
  return prisma.usuario.create({
    data: {
      ...data,
      senha: hashedsenha,
      perfil: data.perfil ? (Perfil[data.perfil as keyof typeof Perfil]) : Perfil.USUARIO,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      perfil: true,
    },
  });
}

export async function getUserById(id: string) {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      cpf: true,
      nome: true,
      email: true,
      telefone: true,
      perfil: true,
      criadoEm: true,
    },
  });
}

export async function getUsers() {
  return prisma.usuario.findMany({
    orderBy: { criadoEm: "desc" },
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      criadoEm: true,
    },
  });
}


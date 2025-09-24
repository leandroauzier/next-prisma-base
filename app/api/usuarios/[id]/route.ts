import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} from "@/features/usuarios/services/userService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Perfil } from "@prisma/client";
import type { RouteHandler } from "@/types/next";
import { hash } from "bcryptjs";


// GET /api/usuarios/[id]
export const GET: RouteHandler<{ id: string }> = async (req, { params }) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
};

// POST /api/usuarios
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (
    !["ADMINISTRADOR", "DESENVOLVEDOR"].includes(
      (session.user.perfil ?? "").toUpperCase()
    )
  ) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { nome, email, senha, cpf, telefone, perfil } = body;

    if (!nome || !email || !senha || !cpf) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const senhaHash = await hash(senha, 10);

    const newUser = await registerUser({
      nome,
      email,
      senha: senhaHash,
      cpf,
      telefone,
    });

    if (perfil && session.user.perfil?.toUpperCase() === "DESENVOLVEDOR") {
      newUser.perfil = perfil as Perfil;
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/usuarios/[id]
export const PUT: RouteHandler<{ id: string }> = async (req, { params }) => {
  const { id } = await params;
  const data = await req.json();

  try {
    const updated = await updateUser(id, data);
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};

// DELETE /api/usuarios/[id]
export const DELETE: RouteHandler<{ id: string }> = async (req, { params }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await deleteUser(session.user.id, id);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
};

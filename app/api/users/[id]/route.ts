import { NextRequest, NextResponse } from "next/server";
import { getUserById, registerUser, updateUser, deleteUser } from "@/features/users/services/userService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

// GET /api/users/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

// POST /api/users -> Cria novo usuário (apenas ADMIN e DEV)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (!["ADMIN", "DEV"].includes((session.user.role ?? "").toUpperCase())) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const body = await req.json();

    const { nome, email, password, cpf, telefone, role } = body;

    if (!nome || !email || !password || !cpf) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const newUser = await registerUser({
      nome,
      email,
      password,
      cpf,
      telefone,
    });

    // força o role só se o criador for DEV (hierarquia mais alta)
    if (role && session.user.role?.toUpperCase() === "DEV") {
      newUser.role = role as Role;
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/users/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();

  try {
    const updated = await updateUser(id, data);
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE /api/users/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const result = await deleteUser(session.user.id, params.id);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }
}

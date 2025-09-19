import { NextResponse } from "next/server";
import { registerUser } from "@/features/users/services/userService";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.cpf || !data.nome || !data.email || !data.password || !data.nome) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const user = await registerUser(data);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Erro no registro:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

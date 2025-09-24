import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

async function main() {
  const prisma = new PrismaClient();

  const hashedPassword = await hash("12345678", 10);

  await prisma.user.upsert({
    where: { email: "dev@admin.com" },
    update: {},
    create: {
      nome: "Usuário Dev",
      email: "dev@admin.com",
      cpf: "00000000000",
      telefone: "000000000",
      password: hashedPassword,
      role: Role.DEV,
    },
  });

  console.log("✅ Seed executado com sucesso");
  console.log("➡ Email: dev@admin.com - Senha: 12345678");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { PrismaClient } from "@prisma/client";

declare global {
  // Evita recriar o client em cada reload no Next.js
  // (só funciona em ambiente de dev)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // opcional: ajuda no debug
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

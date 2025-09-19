import { prisma } from "@/lib/prisma"; // ou fetch para API interna

export async function login({ email, password }: { email: string; password: string }) {
  return prisma.user.findUnique({
    where: { email },
  });
}

import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const usuario = await prisma.usuario.findUnique({
          where: { email: credentials.email },
        });
        if (!usuario) return null;

        const isValid = await compare(credentials.password, usuario.senha);
        if (!isValid) return null;

        await prisma.usuario.update({
          where: { id: usuario.id },
          data: { ultimoLogin: new Date() },
        })

        return {
          id: usuario.id,
          email: usuario.email,
          perfil: usuario.perfil,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.perfil = (user as any).perfil?.toUpperCase() ?? "USUARIO";
      }
      if (!token.perfil) token.perfil = "USUARIO"; // garante perfil
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.perfil = (token.perfil as string)?.toUpperCase();
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

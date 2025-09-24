import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      perfil?: string;
    } & DefaultSession["USUARIO"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    perfil?: string;
  }

  interface JWT {
    id: string;
    email: string;
    perfil?: string;
  }
}

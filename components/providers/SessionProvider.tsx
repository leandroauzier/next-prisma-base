"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

export function SessionProvider({ children, session }: { children: React.ReactNode, session?: Session | null }) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const rolePermissions: Record<string, string[]> = {
  DESENVOLVEDOR: ["/perfil", "/usuarios", "/desenvolvedor"],
  ADMINISTRADOR: ["/perfil", "/usuarios",],
  USUARIO: ["/perfil"],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    const isProtected = Object.values(rolePermissions)
      .flat()
      .some((route) => pathname.startsWith(route));

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  const perfil = ((token.perfil as string) ?? "USUARIO").toUpperCase();

  const allowedRoutes = rolePermissions[perfil] ?? [];

  const isAllowed = allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );


  if (!isAllowed) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

// Executa middleware só nas rotas que exigem controle
export const config = {
  matcher: ["/perfil/:path*", "/usuarios/:path*", "/desenvolvedor/:path*"],
};

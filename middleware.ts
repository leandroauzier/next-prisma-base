import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const rolePermissions: Record<string, string[]> = {
  DEV: ["/perfil", "/users", "/desenvolvedor"],
  ADMIN: ["/perfil", "/users",],
  USER: ["/perfil"],
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

  const role = ((token.role as string) ?? "USER").toUpperCase();

  const allowedRoutes = rolePermissions[role] ?? [];

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
  matcher: ["/perfil/:path*", "/users/:path*", "/desenvolvedor/:path*"],
};

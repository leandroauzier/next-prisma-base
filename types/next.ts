// types/next.ts
import { NextRequest } from "next/server";

export type RouteContext<T extends Record<string, string>> = {
  params: Promise<T>;
};

export type RouteHandler<T extends Record<string, string>> = (
  req: NextRequest,
  ctx: RouteContext<T>
) => Promise<Response> | Response;

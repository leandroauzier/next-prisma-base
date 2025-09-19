"use client";

import { signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-red-600 transition-colors text-left text-red-400"
    >
      <IconLogout className="w-5 h-5" />
      <span>Sair</span>
    </button>
  );
}

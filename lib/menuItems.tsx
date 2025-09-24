// lib/menuItems.tsx
import { IconHome, IconUsers, IconDashboard, IconCode } from "@tabler/icons-react";
import { ReactNode } from "react";

export type MenuItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const baseItems: MenuItem[] = [
  { label: "Início", href: "/", icon: <IconHome className="w-5 h-5" /> },
  { label: "Dashboard", href: "/dashboard", icon: <IconDashboard className="w-5 h-5" /> },
];

export const roleItems: Record<string, MenuItem[]> = {
  ADMIN: [
    { label: "Usuários", href: "/users", icon: <IconUsers className="w-5 h-5" /> },
  ],
  DEV: [
    { label: "Usuários", href: "/users", icon: <IconUsers className="w-5 h-5" /> },
    { label: "Desenvolvedor", href: "/desenvolvedor", icon: <IconCode className="w-5 h-5" /> },
  ],
};

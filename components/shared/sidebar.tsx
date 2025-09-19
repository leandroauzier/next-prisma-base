"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";

type SidebarItem =
  | {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }
  | {
    label: string;
    action: () => void | Promise<void>;
    icon?: React.ReactNode;
  }
  | {
    label: string;
    component: React.ReactNode;
  };



type SidebarProps = {
  items: SidebarItem[];
  title?: string;
  width?: "sm" | "md" | "lg";
};

export default function Sidebar({
  items,
  title = "Sistema de Gestão",
  width = "md",
}: SidebarProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const widthStyles: Record<string, string> = {
    sm: "w-40",
    md: "w-60",
    lg: "w-80",
  };

  const menuItems: SidebarItem[] =
    status === "authenticated"
      ? [
        ...items,
        {
          label: "Sair",
          icon: <IconLogout className="w-5 h-5" />,
          action: () => signOut({ callbackUrl: "/login" }),
        },
      ]
      : items;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg ${widthStyles[width]
        } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        {title}
        {status === "loading" && (
          <div className="mt-2 h-3 w-24 rounded bg-gray-700 animate-pulse" />
        )}

        {status === "authenticated" && (
          <>
            {session?.user?.email && (
              <p className="text-xs text-gray-400 mt-1">{session.user.email}</p>
            )}
            {session?.user?.role && (
              <p className="text-xs text-gray-400 mt-1">{(session.user.role).toUpperCase()}</p>
            )}
          </>
        )}

      </div>

      {/* Menu */}
      <nav className="flex-1 p-2">
        {status === "loading" ? (
          <ul className="space-y-2">
            <li className="h-8 w-32 bg-gray-700 rounded animate-pulse" />
            <li className="h-8 w-28 bg-gray-700 rounded animate-pulse" />
            <li className="h-8 w-36 bg-gray-700 rounded animate-pulse" />
          </ul>
        ) : (
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${pathname === item.href
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                      }`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                ) : "action" in item ? (
                  <button
                    onClick={item.action}
                    className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-red-600 transition-colors text-left text-red-400"
                  >
                    {item.icon && <span>{item.icon}</span>}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  item.component
                )}
              </li>
            ))}
          </ul>

        )}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} TCE-AP
      </div>
    </aside>
  );
}

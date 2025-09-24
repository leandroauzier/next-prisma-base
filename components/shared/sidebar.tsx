// components/shared/Sidebar.tsx
"use client";

import { useSidebar } from "@/context/sidebarContext";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import Swal from "sweetalert2";

type SidebarItem =
  | { label: string; href: string; icon?: React.ReactNode }
  | { label: string; action: () => void | Promise<void>; icon?: React.ReactNode }
  | { label: string; component: React.ReactNode };

type SidebarProps = {
  items: SidebarItem[];
  title?: string;
};

export default function Sidebar({ items, title = "Sistema de Gestão" }: SidebarProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, setCollapsed } = useSidebar();

  // sempre fecha quando for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  const menuItems: SidebarItem[] =
    status === "authenticated"
      ? [
        ...items,
        {
          label: "Sair",
          icon: <IconLogout className="w-5 h-5" />,
          action: async () => {
            const realizarLogout = await Swal.fire({
              title: "Tem certeza?",
              text: "Você será desconectado do sistema.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sim, sair",
              cancelButtonText: "Cancelar",
            });
            if (realizarLogout.isConfirmed) {
              signOut({ callbackUrl: "/login" });
            }
          }
        },
      ]
      : items;

  return (
    <>
      {/* Botão para colapsar no desktop */}
      {/* <Button
        icon={<IconMenu2 className="w-6 h-6" />}
        onClick={toggleCollapsed}
        className="p-2 text-white bg-gray-900 fixed top-2 left-1 z-50 rounded hidden md:inline-flex"
      /> */}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-60"} ${collapsed ? "overflow-hidden" : ""}`}
      >
        {/* Header */}
        <div className="px-4 pt-12 pb-4 text-lg font-bold border-b border-gray-700 truncate">
          {!collapsed && title}
          {status === "authenticated" && !collapsed && (
            <>
              {session?.user?.email && (
                <p className="text-xs text-gray-400 mt-1 truncate">{session.user.email}</p>
              )}
              {session?.user?.role && (
                <p className="text-xs text-gray-400 mt-1">
                  {(session.user.role as string).toUpperCase()}
                </p>
              )}
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={i} className="relative group">
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${pathname === item.href
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                      }`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                ) : "action" in item ? (
                  <button
                    onClick={item.action}
                    className="flex w-full items-center gap-2 p-2 rounded-md hover:bg-red-600 transition-colors text-left text-red-400"
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                ) : (
                  item.component
                )}

                {/* Tooltip quando colapsado */}
                {collapsed && "label" in item && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 text-sm border-t border-gray-700">
          {!collapsed && `© ${new Date().getFullYear()} Sistema de Gestão`}
        </div>
      </aside>
    </>
  );
}

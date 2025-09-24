// components/layout/MainContent.tsx
"use client";

import { useSidebar } from "@/context/sidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={`flex-1 p-10 min-h-screen bg-zinc-100 transition-all duration-300 ${
        collapsed ? "ml-16" : "ml-60"
      }`}
    >
      <div className="mb-40">{children}</div>
    </main>
  );
}

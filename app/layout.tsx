import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/sidebar";
import Footer from "@/components/shared/footer";
import { IconHome, IconUsers, IconSettings, IconDashboard, IconCode } from "@tabler/icons-react";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCE-AP",
  description: "Tribunal de Contas do Estado do Amapá",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { label: "Início", href: "/", icon: <IconHome className="w-5 h-5" /> },
    { label: "Dashboard", href: "/dashboard", icon: <IconDashboard className="w-5 h-5" /> },
    { label: "Usuários", href: "/users", icon: <IconUsers className="w-5 h-5" /> },
    { label: "Desenvolvedor", href: "/desenvolvedor", icon: <IconCode className="w-5 h-5" /> },
  ];

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        <SessionProvider>
          <div className="fixed top-0 left-0 h-full w-60">
            <Sidebar items={menuItems} />
          </div>

          <main className="flex-1 ml-60 min-h-screen">
            <div className="p-6">{children}</div>
            <Footer />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}

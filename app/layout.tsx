import MainContent from "@/components/layout/MainContent";
import { SessionProvider } from "@/components/providers/SessionProvider";
import Sidebar from "@/components/shared/sidebar";
import { SidebarProvider } from "@/context/sidebarContext";
import { authOptions } from "@/lib/auth";
import { baseItems, roleItems } from "@/lib/menuItems";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? "USER";

  const menuItems = [...baseItems, ...(roleItems[role] ?? [])];

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
        <SessionProvider session={session}>
          <SidebarProvider>
            <Sidebar items={menuItems} />
            <MainContent>{children}</MainContent>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

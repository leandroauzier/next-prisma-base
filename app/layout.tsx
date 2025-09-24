import MainContent from "@/components/layout/MainContent";
import { SessionProvider } from "@/components/providers/SessionProvider";
import Sidebar from "@/components/shared/sidebar";
import { SidebarProvider } from "@/context/sidebarContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { baseItems, roleItems } from "@/lib/menuItems";
import type { Metadata } from "next";
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
  title: "SISGES",
  description: "Sistema de gestão",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);


  const perfil = (session?.user?.perfil ?? "USUARIO").toUpperCase();
  const menuItems = [...baseItems, ...(roleItems[perfil] ?? [])];

  console.log("SSR session =>", session?.user);



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

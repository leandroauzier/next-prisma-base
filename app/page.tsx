'use client'
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <div className="flex justify-center py-10">
            <Image
              alt="logo"
              src={"/globe.svg"}
              width={100}
              height={100}
            />
          </div>
          Bem-vindo ao <span className="text-blue-600">Sistema de Gestão</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          Gerencie usuários, configure permissões e mantenha o controle de forma simples e eficiente.
        </p>

        <div className="flex gap-4">
          {status !== "authenticated" &&
            <Button
              label="Fazer login"
              variant="primary"
              onClick={() => router.push("/dashboard")}
            />
          }
          <Button
            label="Entrar no Dashboard"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white shadow-inner">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🔒 Segurança</h3>
            <p className="text-gray-600">
              Login protegido com autenticação e gerenciamento de permissões por perfil.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">⚡ Agilidade</h3>
            <p className="text-gray-600">
              Interface simples e intuitiva para encontrar e gerenciar informações rapidamente.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Controle</h3>
            <p className="text-gray-600">
              Relatórios e gestão centralizada para administradores e desenvolvedores.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

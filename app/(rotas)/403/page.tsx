import Footer from "@/components/shared/footer";
import Link from "next/link";

export default async function AccessDeniedPage() {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 ml-60 flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-semibold mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">
            Você não tem permissão para acessar esta página.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Voltar para Início
          </Link>
        </div>

        <Footer />
      </main>
    </div>
  );
}

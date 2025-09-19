"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [atBottom, setAtBottom] = useState(false);

  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setAtBottom(bottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full transition-all duration-300 shadow-lg bg-gray-800 text-white ${
        atBottom ? "h-32" : "h-14"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <p className="text-center">1991–{anoAtual} • Tribunal de Contas do Estado do Amapá • Av. FAB, nº 900, Centro, Macapá-AP, CEP 68900-922</p>
        {atBottom && (
          <div className="mt-2 text-center text-sm text-gray-300">
            <p>Mais informações, links úteis e créditos aparecem aqui 🚀</p>
          </div>
        )}
      </div>
    </footer>
  );
}

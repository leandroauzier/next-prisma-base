"use client";

import { useState, FormEvent } from "react";
import { registerUser } from "@/app/actions/auth";
import Swal from "sweetalert2";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { normalizeWord } from "@/utils/normalize";

export default function CadastroPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const nome = normalizeWord(formData.get("nome") as string);
    const sobrenome = normalizeWord(formData.get("sobrenome") as string);

    const data = {
      nome: `${nome} ${sobrenome}`,
      cpf: formData.get("cpf") as string,
      email: formData.get("email") as string,
      telefone: formData.get("telefone") as string,
      password: formData.get("password") as string,
      role: "USER",
    };

    try {
      await registerUser(data);
      Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Usuário Criado com sucesso!",
        timer: 1500,
        timerProgressBar: true,
      })
      e.currentTarget.reset();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.message,
        showCloseButton: true,
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            className="w-full md:col-span-1"
            required
          />
          <Input
            type="text"
            name="sobrenome"
            placeholder="Sobrenome"
            className="w-full md:col-span-2"
            required
          />
        </div>

        <Input type="cpf" name="cpf" placeholder="CPF" required />
        <Input type="email" name="email" placeholder="E-mail" required />
        <Input type="phone" name="telefone" placeholder="Telefone (opcional)" />
        <Input type="password" name="password" placeholder="Senha" required minLenght={8}/>

        <Button
          type="submit"
          disabled={loading}
          label={loading ? "Cadastrando..." : "Cadastrar"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";

type UserFormProps = {
  initialData?: {
    nome: string;
    email: string;
    cpf?: string;
    telefone?: string;
  };
  onSubmit: (data: any) => Promise<void>;
};

export default function UserForm({ initialData, onSubmit }: UserFormProps) {
  const [form, setForm] = useState({
    nome: initialData?.nome || "",
    email: initialData?.email || "",
    cpf: initialData?.cpf || "",
    telefone: initialData?.telefone || "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dataToSend = { ...form };
    if (!initialData) {
      await onSubmit(dataToSend);
    } else {
      const { password, ...rest } = dataToSend;
      await onSubmit(rest);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={form.cpf}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {!initialData && (
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {initialData ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

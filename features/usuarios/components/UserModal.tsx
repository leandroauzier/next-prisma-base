"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import { createUser } from "../services/userService";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function UserModal({ isOpen, onClose, onCreated }: UserModalProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    perfil: "USUARIO",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit() {
    try {
      const result = await createUser(form);
      Swal.fire({
        icon: "success",
        title: "Usuário criado com sucesso!",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
      onCreated();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.message ?? "Erro ao criar usuário",
      });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl mb-4">Novo Usuário</h2>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <select
          name="perfil"
          value={form.perfil}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        >
          <option value="USUARIO">Usuário</option>
          <option value="ADMINISTRADOR">Administrador</option>
          <option value="DESENVOLVEDOR">Desenvolvedor</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button label="Cancelar" onClick={onClose} variant="secondary" />
          <Button label="Salvar" onClick={handleSubmit} variant="primary" />
        </div>
      </div>
    </div>
  );
}

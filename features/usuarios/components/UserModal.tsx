// features/usuarios/components/UserModal.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import { createUserAction, updateUserAction } from "@/app/actions/user";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { normalizeWord } from "@/utils/normalize";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (user: any) => void;
  initialData?: {
    id?: string;
    nome: string;
    email: string;
    cpf?: string;
    telefone?: string;
    perfil?: string;
  };
};

export default function UserModal({ isOpen, onClose, onSaved, initialData }: UserModalProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    perfil: "USUARIO",
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (initialData) {
      setForm({
        nome: initialData.nome,
        email: initialData.email,
        senha: "",
        cpf: initialData.cpf ?? "",
        telefone: initialData.telefone ?? "",
        perfil: initialData.perfil ?? "USUARIO",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit() {
    startTransition(async () => {
      try {
        const payload = {
          ...form,
          nome: normalizeWord(form.nome)
        }
        let user;
        if (initialData?.id) {
          // edição
          user = await updateUserAction(initialData.id, payload);
          Swal.fire({ icon: "success", title: "Usuário atualizado!" });
        } else {
          // criação
          user = await createUserAction(payload);
          Swal.fire({
            icon: "success",
            title: "Usuário criado!"
          });
        }
        onSaved(user);
        onClose();
      } catch (err: any) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: err.message
        });
      }
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl mb-4">
          {initialData?.id ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <Input
          name="nome"
          type="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        {!initialData?.id && (
          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
        )}
        <Input
          name="cpf"
          type="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <Input
          name="telefone"
          type="phone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <Select
          label="Perfil"
          name="perfil"
          value={form.perfil}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          options={[
            { value: "USUARIO", label: "Usuário" },
            { value: "ADMINISTRADOR", label: "Administrador" },
            { value: "DESENVOLVEDOR", label: "Desenvolvedor" }
          ]}
        />

        <div className="flex justify-end gap-2">
          <Button label="Cancelar" onClick={onClose} variant="secondary" />
          <Button
            label={isPending ? "Salvando..." : "Salvar"}
            onClick={handleSubmit}
            variant="primary"
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}

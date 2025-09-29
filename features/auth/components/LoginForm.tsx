"use client";

import Button from "@/components/ui/Button";
import { LoginSchema } from "@/lib/schema/auth";
import { formatZodErrors } from "@/lib/schema/zodHelpers/zodErrorFormatter";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      const error = formatZodErrors(result.error)

      Swal.fire({
        icon: "error",
        title: "Erro de validação",
        html: `
        <ul style="text-align:left">
          ${error.properties?.email?.errors.map((msg) => `<li>${msg}</li>`).join("") ?? ""}
          ${error.properties?.password?.errors.map((msg) => `<li>${msg}</li>`).join("") ?? ""}
        </ul>
        `,
      });
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      const swalError = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true
      });
      swalError.fire({
        toast: true,
        icon: "error",
        text: "Email ou senha estão incorretos",
        showConfirmButton: false,
      })
    } else {
      const swalSuccess = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 1500,
        timerProgressBar: true
      });
      swalSuccess.fire({
        toast: true,
        icon: "success",
        title: "Login realizado com sucesso!",
        showConfirmButton: false,
      })
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Seu email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Senha</label>
        <input
          type="password"
          value={password}
          placeholder="Sua Senha"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <Button
        label="Entrar"
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      />
    </form>
  );
}

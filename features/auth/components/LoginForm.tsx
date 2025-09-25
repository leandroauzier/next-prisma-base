"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, // 🔑 evita redirecionamento automático
      email,
      password,
    });

    if (res?.error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: true,
      });

      Toast.fire({
        icon: "error",
        title: "Opps... " + "Email ou senha estão incorretos",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
      });

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
          required
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
          required
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

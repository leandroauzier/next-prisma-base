"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SafeUser } from "../services/userService";

export default function UserList({ users }: { users: SafeUser[] }) {
  const router = useRouter();
  return (
    <div className="w-full">
      {/* Tabela (aparece em telas md para cima) */}
      <table className="hidden md:table border w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Nome</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{u.nome}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">
                <Button label="Editar" onClick={() => router.push(`/users/${u.id}`)} className="text-blue-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards (aparece só no mobile) */}
      <div className="space-y-3 md:hidden">
        {users.map((u) => (
          <div
            key={u.id}
            className="border rounded-lg p-3 shadow-sm bg-white flex flex-col"
          >
            <p className="font-semibold">{u.nome}</p>
            <p className="text-sm text-gray-600">{u.email}</p>
            <div className="mt-2">
              <Button label="Editar" onClick={() => router.push(`/users/${u.id}`)} className="text-blue-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

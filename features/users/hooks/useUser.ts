"use client";

import { useState, useEffect } from "react";

type User = {
  id: string;
  nome: string;
  email: string;
  role?: string;
  cpf?: string;
  telefone?: string;
  createdAt?: string;
};

export function useUsers(userId?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar lista ou um usuário específico
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (userId) {
          const res = await fetch(`/api/users/${userId}`);
          if (!res.ok) throw new Error("Erro ao buscar usuário");
          const data = await res.json();
          setUser(data);
        } else {
          const res = await fetch("/api/users");
          if (!res.ok) throw new Error("Erro ao buscar usuários");
          const data = await res.json();
          setUsers(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return { users, user, loading, error };
}

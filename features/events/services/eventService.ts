import { Event } from "../types";

export async function getEvents(): Promise<Event[]> {
  // Simulação → troque por chamada real
  return [
    { id: "1", titulo: "Workshop Next.js", descricao: "Evento sobre Next 15", data: "2025-09-20" },
    { id: "2", titulo: "Curso Prisma ORM", descricao: "Banco de dados com Prisma", data: "2025-10-01" },
  ];
}

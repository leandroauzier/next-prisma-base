import { Event } from "../types";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{event.titulo}</h3>
      <p className="text-sm text-gray-600">{event.data}</p>
      <p>{event.descricao}</p>
    </div>
  );
}

// utils/parseDate.ts
import { parse } from "date-fns";

export function parseDate(input: string | Date): Date {
  if (input instanceof Date) {
    return input;
  }

  // Tenta com milissegundos
  let date = parse(input, "yyyy-MM-dd HH:mm:ss.SSS", new Date());
  if (!isNaN(date.getTime())) return date;

  // Tenta sem milissegundos
  date = parse(input, "yyyy-MM-dd HH:mm:ss", new Date());
  if (!isNaN(date.getTime())) return date;

  // fallback: tenta converter para ISO
  return new Date(input.replace(" ", "T"));
}

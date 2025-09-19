// lib/date.ts
import { formatInTimeZone } from "date-fns-tz";

export const TIMEZONE = "America/Sao_Paulo";

export function formatDate(date: Date | string) {
  return formatInTimeZone(new Date(date), TIMEZONE, "dd/MM/yyyy HH:mm");
}

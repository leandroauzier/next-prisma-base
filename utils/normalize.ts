export function normalizeWord(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ") // remove espaços extras
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

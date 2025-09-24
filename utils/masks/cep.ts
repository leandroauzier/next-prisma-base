export function maskCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
    .slice(0, 9); // limite 99999-999
}

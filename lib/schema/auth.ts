import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Formato de Email inválido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
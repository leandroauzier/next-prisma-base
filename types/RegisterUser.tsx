import { Perfil } from "@prisma/client";

export type RegisterUserInput = {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  perfil?: string;
};

// tipa o retorno (sem senha)
export type RegisterUserOutput = {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  perfil: Perfil;
};
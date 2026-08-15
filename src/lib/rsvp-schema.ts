import { z } from "zod";

// Limites dos campos livres. O banco usa colunas `text` (sem limite), então
// estes números existem só para evitar abuso — podem ser generosos.
export const NOME_MAX = 100;
export const NOME_HEROI_MAX = 80;
export const MENSAGEM_MAX = 1000;

export const rsvpSchema = z.object({
  nome: z
    .string()
    .min(2, "Informe seu nome")
    .max(NOME_MAX, `Nome muito longo (máximo ${NOME_MAX} caracteres)`),
  // Campos opcionais são apenas `.optional()`: como a única regra é um `max`,
  // a string vazia que o formulário envia já passa na validação.
  nomeHeroi: z
    .string()
    .max(
      NOME_HEROI_MAX,
      `Nome de herói muito longo (máximo ${NOME_HEROI_MAX} caracteres)`,
    )
    .optional(),
  comparecera: z.enum(["sim", "nao"], {
    message: "Diga se vai comparecer",
  }),
  mensagem: z
    .string()
    .max(
      MENSAGEM_MAX,
      `Mensagem muito longa (máximo ${MENSAGEM_MAX} caracteres)`,
    )
    .optional(),
});

// Tipo de entrada (o que o formulário fornece) e saída (após validação/coerção)
export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpOutput = z.output<typeof rsvpSchema>;

import { z } from "zod";

export const rsvpSchema = z.object({
  nome: z.string().min(2, "Informe seu nome").max(80),
  nomeHeroi: z.string().max(80).optional().or(z.literal("")),
  comparecera: z.enum(["sim", "nao"], {
    message: "Diga se vai comparecer",
  }),
  acompanhante: z.enum(["sim", "nao"]),
  qtdAcompanhantes: z.coerce.number().int().min(0).max(10).optional(),
  mensagem: z.string().max(300).optional().or(z.literal("")),
});

// Tipo de entrada (o que o formulário fornece) e saída (após validação/coerção)
export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpOutput = z.output<typeof rsvpSchema>;

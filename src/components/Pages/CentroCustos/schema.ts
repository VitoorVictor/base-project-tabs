import { z } from "zod";

export const formSchema = z.object({
  descricao: z
    .string({
      required_error: "A descrição do centro de custo é obrigatória",
    })
    .min(4, "A descrição deve ter mais de 3 caracteres.")
    .max(255, "A descrição deve ter menos de 255 caracteres."),
  ativo: z.boolean({ required_error: "Situação de ativo é obrigatória" }),
});

export type FormSchema = z.infer<typeof formSchema>;

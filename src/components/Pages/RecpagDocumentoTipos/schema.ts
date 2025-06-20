import { z } from "zod";

export const formSchema = z.object({
  descricao: z
    .string({
      required_error: "A descrição do tipo de rec/pag é obrigatória",
    })
    .min(4, "A descrição deve ter mais de 3 caracteres.")
    .max(255, "A descrição deve ter menos de 255 caracteres."),
});

export type FormSchema = z.infer<typeof formSchema>;

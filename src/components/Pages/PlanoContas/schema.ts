import { z } from "zod";

export const formSchema = z.object({
  descricao: z
    .string({
      required_error: "A descrição do plano conta é obrigatória",
    })
    .min(3, "A descrição deve ter 3 ou mais caracteres.")
    .max(255, "A descrição deve ter menos de 255 caracteres."),
  natureza: z.string({
    required_error: "A descrição do plano conta é obrigatória",
  }),
  participaAnaliseResultado: z.boolean({
    required_error: "participação da análise dos resultados é obrigatória",
  }),
  conta: z
    .string({
      required_error: "A conta é obrigatória",
    })
    .refine((val) => val.length > 0, {
      message: "A conta deve conter apenas números e não pode estar vazia",
    })
    .transform((val) => val.replace(/\D/g, "")),
  ativo: z.boolean({ required_error: "Situação de ativo é obrigatória" }),
});

export type FormSchema = z.infer<typeof formSchema>;

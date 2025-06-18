import z from "zod"

export const formSchema = z.object({
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(1, "A senha não pode estar vazia")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
})

export type FormSchema = z.infer<typeof formSchema>;
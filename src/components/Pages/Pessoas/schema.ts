import { z } from "zod";

const validaCPF = (cpf: string) => {
  let soma = 0;
  let resto;
  const strCPF = cpf.replace(/[^\d]/g, "");
  if (strCPF.length !== 11 || /^(\d)\1+$/.test(strCPF)) return false;

  for (let i = 1; i <= 9; i++) soma += parseInt(strCPF[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(strCPF[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(strCPF[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(strCPF[10]);
};

const validaCNPJ = (cnpj: string) => {
  const strCNPJ = cnpj.replace(/[^\d]/g, "");
  if (strCNPJ.length !== 14 || /^(\d)\1+$/.test(strCNPJ)) return false;

  let tamanho = strCNPJ.length - 2;
  let numeros = strCNPJ.substring(0, tamanho);
  const digitos = strCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos[0])) return false;

  tamanho += 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos[1]);
};

export const formSchema = z
  .object({
    dataCadastro: z.string().nonempty("Data do cadastro é obrigatória"),
    pessoaSituacao: z
      .object(
        {
          id: z.number(),
          descricao: z.string().optional(),
        },
        {
          message: "Situação é obrigatória",
        }
      )
      .nullable()
      .optional(),
    empresa: z.object({
      id: z.number({
        message: "Empresa é obrigatória",
      }),
      razaoSocial: z.string().optional(),
    }),
    pessoaGrupo: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .nullable()
      .optional(),
    pessoaOrigem: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .nullable()
      .optional(),
    cpfCnpj: z
      .string()
      .transform((val) => (val.trim() === "" ? null : val)) // Remove caracteres não numéricos
      .refine(
        (val) => {
          if (!val) return true; // Permite null (campo opcional)
          return val.replace(/\D/g, "").length === 11
            ? validaCPF(val)
            : val.replace(/\D/g, "").length === 14
            ? validaCNPJ(val)
            : false;
        },
        { message: "CPF/CNPJ inválido." }
      )
      .nullable()
      .optional(),
    rgIe: z
      .string()
      .min(3, "RG / IE deve ter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    rgOrgaoEmissor: z
      .string()
      .min(2, "Emissão deve ter mais de 2 dig.")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    nacionalidade: z
      .string()
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    tipoCliente: z.boolean(),
    tipoFornecedor: z.boolean(),
    tipoTransportador: z.boolean(),
    dataNascimento: z
      .string()
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    razaoSocial: z
      .string()
      .nonempty("Razão social/Nome Completo é obrigatória"),
    nomeFantasia: z
      .string()
      .min(3, "Nome fantasia / Nome social deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    cep: z
      .string()
      .min(8, "CEP inválido")
      .max(9, "CEP inválido")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    endereco: z
      .string()
      .min(3, "Endereço deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    numero: z
      .string()
      .min(3, "Número deve conter mais de 2 digitos")
      .max(4, "Endereço deve conter no máximo de 4 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    bairro: z
      .string()
      .min(3, "Bairro deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    cidade: z.object(
      {
        id: z.number(),
        cidadeEstado: z.string().optional(),
      },
      { message: "Cidade é obrigatória" }
    ),
    estadoCivil: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .nullable()
      .optional(),
    complemento: z
      .string()
      .min(3, "Complemento deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    email: z
      .string()
      .email("Email inválido")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    emailAdicional: z
      .string()
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    fone: z
      .string()
      .min(14, "Fone inválido") // Formato esperado: (##) ####-####
      .max(15, "Fone inválido")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    celular: z
      .string()
      .min(15, "Celular inválido") // Formato esperado: (##) # ####-####
      .max(16, "Celular inválido")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    whatsapp: z
      .string()
      .min(14, "Whatsapp inválido") // Formato esperado: (##) # ####-#### ou (##) ####-####
      .max(16, "Whatsapp inválido")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    pai: z
      .string()
      .min(3, "Nome do pai deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    mae: z
      .string()
      .min(3, "Nome da mãe deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    contato: z
      .array(
        z.object({
          id: z.number().optional(),
          pessoaTipoContato: z.object({
            id: z.number(),
            descricao: z.string().optional(),
          }),
          nome: z.string().min(3, "Reponsável deve conter mais de 3 digitos"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          departamento: z
            .string()
            .min(3, "Departamento deve conter mais de 3 digitos"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          fone: z
            .string()
            .min(14, "Fone inválido") // Formato esperado: (##) ####-####
            .max(16, "Fone inválido"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          email: z.string().email("Email inválido"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          observacao: z
            .string()
            // .min(3, "Observação deve conter mais de 3 digitos")
            // .or(z.literal(""))
            // .transform((val) => (val.trim() === "" ? null : val))
            // .nullable()
            .optional(),
        })
      )
      .optional(),
    enderecoAuxiliar: z
      .array(
        z.object({
          id: z.number().optional(),
          cep: z.string().min(9, "CEP inválido").max(9, "CEP inválido"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          endereco: z.string().min(3, "Endereço deve conter mais de 3 digitos"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          numero: z
            .string()
            .min(3, "Número deve conter mais de 2 digitos")
            .max(4, "Endereço deve conter no máximo de 4 digitos"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          bairro: z.string().min(3, "Bairro deve conter mais de 3 digitos"),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          cidade: z.object({
            id: z.number(),
            cidadeEstado: z.string().optional(),
          }),
          complemento: z.string().optional(),
          // .or(z.literal(""))
          // .transform((val) => (val.trim() === "" ? null : val))
          // .nullable(),
          pessoaTipoEndereco: z.object({
            id: z.number(),
            descricao: z.string().optional(),
          }),
        })
      )
      .optional(),
    observacaoGeral: z
      .string()
      .min(3, "Observação geral deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    inscricaoMunicipal: z
      .string()
      .min(3, "Inscrição municipal deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    inscricaoSuframa: z
      .string()
      .min(3, "Inscrição suframa deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    documentoEstrangeiro: z
      .string()
      .min(3, "Documento estrangeiro deve conter mais de 3 digitos")
      .or(z.literal(""))
      .transform((val) => (val.trim() === "" ? null : val))
      .nullable()
      .optional(),
    tipoContribuinte: z.number().nullable().optional(),
    limiteCredito: z
      .number()
      .transform((val) => val * 100)
      .nullable()
      .optional(),
    clienteFinal: z.boolean(),
    optanteSimples: z.boolean(),
    produtorRural: z.boolean(),
    issRetido: z.boolean(),
    vendedor: z.object({
      id: z.number(),
      nome: z.string().optional(),
    }),
    natureza: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => data.tipoCliente || data.tipoFornecedor || data.tipoTransportador,
    {
      message: "Pelo menos um dos campos deve ser marcado",
      path: ["natureza"],
    }
  );

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const formSchemaAnexo = z.object({
  titulo: z
    .string({
      required_error: "O título é obrigatório.",
    })
    .min(1, "O título é obrigatório."),
  vinculoId: z.number(),

  observacao: z
    .string()
    .max(500, "A observação deve ter no máximo 500 caracteres.")
    .nullable()
    .optional(),
  file: z
    .array(z.instanceof(File))
    .min(1, "O arquivo é obrigatório no anexo.")
    .refine(
      (files) => {
        return allowedTypes.includes(files[0].type);
      },
      {
        message:
          "O arquivo deve ser um PDF, JPG, JPEG, PNG, DOC, TXT, XLS ou XLSX.",
      }
    )
    .refine(
      (files) => {
        return (
          files[0].size <=
          Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB) * 1024 * 1024
        ); // 2MB
      },
      {
        message: `O tamanho do arquivo deve ser no máximo ${process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB}.`,
      }
    ),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaAnexo = z.infer<typeof formSchemaAnexo>;

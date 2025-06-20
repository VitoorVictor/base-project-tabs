import { object, z } from "zod";

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
    pessoaSituacaoId: z.number().nullable().optional(),
    empresa: z.object({
      id: z.number({
        message: "Empresa é obrigatória",
      }),
      razaoSocail: z.string().optional(),
    }),
    pessoaGrupo: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .optional(),
    pessoaOrigem: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .optional(),
    cpfCnpj: z
      .string()
      .transform((val) => (val.trim() === "" ? undefined : val)) // Remove caracteres não numéricos
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
      .optional(),
    rgIe: z.string().min(3, "RG / IE deve ter mais de 3 digitos").optional(),
    rgOrgaoEmissor: z
      .string()
      .min(2, "Emissão deve ter mais de 2 dig.")
      .optional(),
    nacionalidade: z.string().optional(),
    tipoCliente: z.boolean(),
    tipoFornecedor: z.boolean(),
    tipoTransportador: z.boolean(),
    dataNascimento: z
      .string()
      .transform((val) => (val.trim() === "" ? undefined : val))
      .optional(),
    razaoSocial: z
      .string({ message: "Razão social/Nome Completo é obrigatória" })
      .min(3, "Mínimo de 3 letras"),
    nomeFantasia: z
      .string()
      .min(3, "Nome fantasia / Nome social deve conter mais de 3 digitos")
      .optional(),
    cep: z.string().min(9, "CEP inválido").max(9, "CEP inválido").optional(),
    endereco: z
      .string()
      .min(3, "Endereço deve conter mais de 3 digitos")
      .optional(),
    numero: z
      .string()
      .min(3, "Número deve conter mais de 2 digitos")
      .max(4, "Endereço deve conter no máximo de 4 digitos")
      .optional(),
    bairro: z
      .string()
      .min(3, "Bairro deve conter mais de 3 digitos")
      .optional(),
    cidade: z.object({
      id: z.number().min(1, { message: "Cidade é obrigatória" }),
      descricao: z.string().optional(),
    }),
    estadoCivilId: z
      .object({
        id: z.number(),
        descricao: z.string().optional(),
      })
      .optional(),
    complemento: z
      .string()
      .min(3, "Complemento deve conter mais de 3 digitos")
      .optional(),
    email: z.string().email("Email inválido").optional(),
    emailAdicional: z.string().optional(),
    fone: z
      .string()
      .min(14, "Fone inválido") // Formato esperado: (##) ####-####
      .max(15, "Fone inválido")
      .optional(),
    celular: z
      .string()
      .min(15, "Celular inválido") // Formato esperado: (##) # ####-####
      .max(16, "Celular inválido")
      .optional(),
    whatsapp: z
      .string()
      .min(14, "Whatsapp inválido") // Formato esperado: (##) # ####-#### ou (##) ####-####
      .max(16, "Whatsapp inválido")
      .optional(),
    pai: z
      .string()
      .min(3, "Nome do pai deve conter mais de 3 digitos")
      .optional(),
    mae: z
      .string()
      .min(3, "Nome da mãe deve conter mais de 3 digitos")
      .optional(),
    contato: z
      .array(
        z.object({
          id: z.number().optional(),
          pessoaTipoContato: z
            .object({
              id: z.number(),
              descricao: z.string().optional(),
            })
            .optional(),
          nome: z
            .string()
            .min(3, "Reponsável deve conter mais de 3 digitos")
            .optional(),
          departamento: z
            .string()
            .min(3, "Departamento deve conter mais de 3 digitos")
            .optional(),
          fone: z
            .string()
            .min(14, "Fone inválido") // Formato esperado: (##) ####-####
            .max(16, "Fone inválido")
            .optional(),
          email: z.string().email("Email inválido").optional(),
          observacao: z
            .string()
            .min(3, "Observação deve conter mais de 3 digitos")
            .optional(),
        })
      )
      .optional(),
    enderecoAuxiliar: z
      .array(
        z.object({
          id: z.number().optional(),
          cep: z
            .string()
            .min(9, "CEP inválido")
            .max(9, "CEP inválido")
            .optional(),
          endereco: z
            .string()
            .min(3, "Endereço deve conter mais de 3 digitos")
            .optional(),
          numero: z
            .string()
            .min(3, "Número deve conter mais de 2 digitos")
            .max(4, "Endereço deve conter no máximo de 4 digitos")
            .optional(),
          bairro: z
            .string()
            .min(3, "Bairro deve conter mais de 3 digitos")
            .optional(),
          cidadeId: z.number().nullable().optional(),
          complemento: z
            .string()
            .min(3, "Complemento deve conter mais de 3 digitos")
            .optional(),
          pessoaTipoEndereco: z
            .object({
              id: z.number(),
              descricao: z.string().optional(),
            })
            .optional(),
        })
      )
      .optional(),
    observacaoGeral: z
      .string()
      .min(3, "Observação geral deve conter mais de 3 digitos")
      .optional(),
    inscricaoMunicipal: z
      .string()
      .min(3, "Inscrição municipal deve conter mais de 3 digitos")
      .optional(),
    inscricaoSuframa: z
      .string()
      .min(3, "Inscrição suframa deve conter mais de 3 digitos")
      .optional(),
    documentoEstrangeiro: z
      .string()
      .min(3, "Documento estrangeiro deve conter mais de 3 digitos")
      .optional(),
    tipoContribuinte: z.number().optional(),
    limiteCredito: z
      .number()
      .transform((val) => val * 100)
      .optional(),
    clienteFinal: z.boolean(),
    optanteSimples: z.boolean(),
    produtorRural: z.boolean(),
    issRetido: z.boolean(),
    vendedorId: z.number().nullable().optional(),
    natureza: z.string().optional(),
  })
  .refine(
    (data) => data.tipoCliente || data.tipoFornecedor || data.tipoTransportador,
    {
      message: "Pelo menos um dos campos deve ser marcado",
      path: ["natureza"],
    }
  );

export type FormSchema = z.infer<typeof formSchema>;

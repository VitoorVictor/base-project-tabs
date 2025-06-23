import { IPessoaTipoEndereco } from "./pessoa-tipo-endereco";
import { IPessoaTipoContato } from "./pessoa-tipo-contato";
import { IPessoaSituacao } from "./pessoa-situacao";
import { IPessoaOrigem } from "./pessoa-origem";
import { IEstadoCivil } from "./estado-civil";
import { IPessoaGrupo } from "./pessoa-grupo";
import { IEmpresa } from "./empresa";
import { ICidade } from "./cidade";

export interface IPessoa {
  id: number;
  secureId: string;
  dataCadastro: string;
  pessoaSituacaoId: number;
  empresaId: number;
  cpfCnpj: string;
  rgIe: string;
  rgOrgaoEmissor: string;
  nacionalidade: string;
  tipoCliente: boolean;
  tipoFornecedor: boolean;
  tipoTransportador: boolean;
  razaoSocial: string;
  nomeFantasia: string;
  pessoaGrupoId: number;
  pessoaOrigemId: number;
  pai: string;
  mae: string;
  dataNascimento: string;
  email: string;
  emailAdicional: string;
  fone: string;
  celular: string;
  whatsapp: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeId: number;
  estadoCivilId: number;
  complemento: string;
  contato: IContato[];
  enderecoAuxiliar: IEnderecoAuxiliar[];
  observacaoGeral: string;
  inscricaoMunicipal: string;
  inscricaoSuframa: string;
  documentoEstrangeiro: string;
  tipoContribuinte: number;
  limiteCredito: number;
  natureza: string;
  clienteFinal: boolean;
  optanteSimples: boolean;
  produtorRural: boolean;
  issRetido: boolean;
  vendedorId: number;
  cidade: ICidade;
  empresa: IEmpresa;
  estadoCivil: IEstadoCivil;
  pessoaGrupo: IPessoaGrupo;
  pessoaOrigem: IPessoaOrigem;
  pessoaSituacao: IPessoaSituacao;
}

interface IContato {
  id?: number;
  nome: string;
  departamento: string;
  fone: string;
  email: string;
  observacao: string;
  pessoaTipoContatoId: number;
  pessoaTipoContato: IPessoaTipoContato;
}

interface IEnderecoAuxiliar {
  id?: number;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidadeId: number;
  cidade: ICidade;
  complemento: string;
  pessoaTipoEnderecoId: number;
  pessoaTipoEndereco: IPessoaTipoEndereco;
}

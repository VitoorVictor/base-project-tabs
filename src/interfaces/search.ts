export interface ISearchCep {
  bairro: string;
  cep: string;
  ibge: string;
  endereco: string;
  cidade: string;
  cidadeId: number;
  uf: string;
}

export interface ISearchCnpj {
  nomeFantasia: string;
  razaoSocial: string;
  endereco: string;
  numero: string;
  bairro: string;
  cep: string;
  uf: string;
  cidadeId: number;
  cidade: string;
  ibge: string;
  email: string;
  dataNascimento: string;
}

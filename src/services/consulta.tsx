import { ISearchCnpj } from "@/interfaces/search";
import { ISearchCep } from "@/interfaces/search";
import { api } from "./api";

export async function fetchCep(cep: string): Promise<ISearchCep> {
  const { data } = await api.get(`/consulta-cep/${cep}`);
  return data;
}

export async function fetchCnpj(cnpj: string): Promise<ISearchCnpj> {
  const { data } = await api.get(`/consulta-cnpj/${cnpj}`);
  return data;
}

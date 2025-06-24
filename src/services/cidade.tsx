import { api } from "./api";
import { IFilterQry } from "@/interfaces/comum";
import { ICidade } from "@/interfaces/cidade";

export async function fetchCidadeAll(filters: IFilterQry): Promise<ICidade[]> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/cidades`, { params });
  return data;
}

export async function fetchCidadeOne(id: string): Promise<ICidade> {
  const { data } = await api.get(`/cidades/${id}`);
  return data;
}

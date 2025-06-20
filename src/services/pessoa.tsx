import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPessoa } from "@/interfaces/pessoa";

export async function fetchPessoaAll(
  filters: IFilterQry
): Promise<IResponse<IPessoa>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/pessoas`, { params });
  return data;
}

export async function fetchPessoaOne(id: string): Promise<IPessoa> {
  const { data } = await api.get(`/pessoas/${id}`);
  return data;
}

export async function createPessoa(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/pessoas", body);
  return data;
}

export async function updatePessoa(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/pessoas/${id}`, body);
  return data;
}

export async function deletePessoa(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/pessoas/${id}`, {
    data: { password },
  });
  return res;
}

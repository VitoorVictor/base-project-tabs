import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPessoaGrupo } from "@/interfaces/pessoa-grupo";

export async function fetchPessoaGrupoAll(
  filters: IFilterQry
): Promise<IResponse<IPessoaGrupo>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/pessoa-grupos`, { params });
  return data;
}

export async function fetchPessoaGrupoOne(id: string): Promise<IPessoaGrupo> {
  const { data } = await api.get(`/pessoa-grupos/${id}`);
  return data;
}

export async function createPessoaGrupo(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/pessoa-grupos", body);
  return data;
}

export async function updatePessoaGrupo(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/pessoa-grupos/${id}`, body);
  return data;
}

export async function deletePessoaGrupo(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/pessoa-grupos/${id}`, {
    data: { password },
  });
  return res;
}

import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPessoaSituacao } from "@/interfaces/pessoa-situacao";

export async function fetchPessoaSituacaoAll(
  filters: IFilterQry
): Promise<IResponse<IPessoaSituacao>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/pessoa-situacoes`, { params });
  return data;
}

export async function fetchPessoaSituacaoOne(
  id: string
): Promise<IPessoaSituacao> {
  const { data } = await api.get(`/pessoa-situacoes/${id}`);
  return data;
}

export async function createPessoaSituacao(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/pessoa-situacoes", body);
  return data;
}

export async function updatePessoaSituacao(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/pessoa-situacoes/${id}`, body);
  return data;
}

export async function deletePessoaSituacao(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/pessoa-situacoes/${id}`, {
    data: { password },
  });
  return res;
}

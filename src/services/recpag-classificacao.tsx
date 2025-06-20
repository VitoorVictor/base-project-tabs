import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IRecpagClassificacao } from "@/interfaces/recpag-classificacao";

export async function fetchRecpagClassificacaoAll(
  filters: IFilterQry
): Promise<IResponse<IRecpagClassificacao>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/recpag-classificoes`, { params });
  return data;
}

export async function fetchRecpagClassificacaoOne(
  id: string
): Promise<IRecpagClassificacao> {
  const { data } = await api.get(`/recpag-classificoes/${id}`);
  return data;
}

export async function createRecpagClassificacao(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/recpag-classificoes", body);
  return data;
}

export async function updateRecpagClassificacao(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/recpag-classificoes/${id}`, body);
  return data;
}

export async function deleteRecpagClassificacao(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/recpag-classificoes/${id}`, {
    data: { password },
  });
  return res;
}

import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPessoaTipoContato } from "@/interfaces/pessoa-tipo-contato";

export async function fetchPessoaTipoContatoAll(
  filters: IFilterQry
): Promise<IResponse<IPessoaTipoContato>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/pessoa-tipo-contatos`, { params });
  return data;
}

export async function fetchPessoaTipoContatoOne(
  id: string
): Promise<IPessoaTipoContato> {
  const { data } = await api.get(`/pessoa-tipo-contatos/${id}`);
  return data;
}

export async function createPessoaTipoContato(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/pessoa-tipo-contatos", body);
  return data;
}

export async function updatePessoaTipoContato(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/pessoa-tipo-contatos/${id}`, body);
  return data;
}

export async function deletePessoaTipoContato(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/pessoa-tipo-contatos/${id}`, {
    data: { password },
  });
  return res;
}

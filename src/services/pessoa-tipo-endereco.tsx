import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPessoaTipoEndereco } from "@/interfaces/pessoa-tipo-endereco";

export async function fetchPessoaTipoEnderecoAll(
  filters: IFilterQry
): Promise<IResponse<IPessoaTipoEndereco>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/pessoa-tipo-enderecos`, { params });
  return data;
}

export async function fetchPessoaTipoEnderecoOne(
  id: string
): Promise<IPessoaTipoEndereco> {
  const { data } = await api.get(`/pessoa-tipo-enderecos/${id}`);
  return data;
}

export async function createPessoaTipoEndereco(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/pessoa-tipo-enderecos", body);
  return data;
}

export async function updatePessoaTipoEndereco(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/pessoa-tipo-enderecos/${id}`, body);
  return data;
}

export async function deletePessoaTipoEndereco(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/pessoa-tipo-enderecos/${id}`, {
    data: { password },
  });
  return res;
}

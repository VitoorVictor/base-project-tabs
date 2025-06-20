import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IRecpagDocumentoTipo } from "@/interfaces/recpag-documento-tipo";

export async function fetchRecpagDocumentoTipoAll(
  filters: IFilterQry
): Promise<IResponse<IRecpagDocumentoTipo>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/recpag-documento-tipos`, { params });
  return data;
}

export async function fetchRecpagDocumentoTipoOne(
  id: string
): Promise<IRecpagDocumentoTipo> {
  const { data } = await api.get(`/recpag-documento-tipos/${id}`);
  return data;
}

export async function createRecpagDocumentoTipo(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/recpag-documento-tipos", body);
  return data;
}

export async function updateRecpagDocumentoTipo(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/recpag-documento-tipos/${id}`, body);
  return data;
}

export async function deleteRecpagDocumentoTipo(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/recpag-documento-tipos/${id}`, {
    data: { password },
  });
  return res;
}

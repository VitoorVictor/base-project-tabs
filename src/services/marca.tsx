import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IMarca } from "@/interfaces/marca";

export async function fetchMarcaAll(
  filters: IFilterQry
): Promise<IResponse<IMarca>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/marcas`, { params });
  return data;
}

export async function fetchMarcaOne(id: string): Promise<IMarca> {
  const { data } = await api.get(`/marcas/${id}`);
  return data;
}

export async function createMarca(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/marcas", body);
  return data;
}

export async function updateMarca(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/marcas/${id}`, body);
  return data;
}

export async function deleteMarca(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/marcas/${id}`, {
    data: { password },
  });
  return res;
}

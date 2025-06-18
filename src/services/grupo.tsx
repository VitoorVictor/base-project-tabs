import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IGrupo } from "@/interfaces/grupo";

export async function fetchGrupoAll(
  filters: IFilterQry
): Promise<IResponse<IGrupo>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/grupos`, { params });
  return data;
}

export async function fetchGrupoOne(id: string): Promise<IGrupo> {
  const { data } = await api.get(`/grupos/${id}`);
  return data;
}

export async function createGrupo(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/grupos", body);
  return data;
}

export async function updateGrupo(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/grupos/${id}`, body);
  return data;
}

export async function deleteGrupo(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/grupos/${id}`, {
    data: { password },
  });
  return res;
}

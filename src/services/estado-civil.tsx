import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IEstadoCivil } from "@/interfaces/estado-civil";

export async function fetchEstadoCivilAll(
  filters: IFilterQry
): Promise<IResponse<IEstadoCivil>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/estado-civis`, { params });
  return data;
}

export async function fetchEstadoCivilOne(id: string): Promise<IEstadoCivil> {
  const { data } = await api.get(`/estado-civis/${id}`);
  return data;
}

export async function createEstadoCivil(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/estado-civis", body);
  return data;
}

export async function updateEstadoCivil(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/estado-civis/${id}`, body);
  return data;
}

export async function deleteEstadoCivil(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/estado-civis/${id}`, {
    data: { password },
  });
  return res;
}

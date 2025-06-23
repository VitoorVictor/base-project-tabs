import { IFilterQry, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IEmpresa } from "@/interfaces/empresa";

export async function fetchEmpresaAll(
  filters: IFilterQry
): Promise<IEmpresa[]> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/empresas`, { params });
  return data;
}

export async function fetchEmpresaOne(id: string): Promise<IEmpresa> {
  const { data } = await api.get(`/empresas/${id}`);
  return data;
}

export async function createEmpresa(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/empresas", body);
  return data;
}

export async function updateEmpresa(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/empresas/${id}`, body);
  return data;
}

export async function deleteEmpresa(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/empresas/${id}`, {
    data: { password },
  });
  return res;
}

import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IConta } from "@/interfaces/conta";

export async function fetchContaAll(
  filters: IFilterQry
): Promise<IResponse<IConta>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/contas`, { params });
  return data;
}

export async function fetchContaOne(id: string): Promise<IConta> {
  const { data } = await api.get(`/contas/${id}`);
  return data;
}

export async function createConta(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/contas", body);
  return data;
}

export async function updateConta(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/contas/${id}`, body);
  return data;
}

export async function deleteConta(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/contas/${id}`, {
    data: { password },
  });
  return res;
}

import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { api } from "./api";
import { IPlanoConta } from "@/interfaces/plano-conta";

export async function fetchPlanoContaAll(
  filters: IFilterQry
): Promise<IResponse<IPlanoConta>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/plano-contas`, { params });
  return data;
}

export async function fetchPlanoContaOne(id: string): Promise<IPlanoConta> {
  const { data } = await api.get(`/plano-contas/${id}`);
  return data;
}

export async function createPlanoConta(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/plano-contas", body);
  return data;
}

export async function updatePlanoConta(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/plano-contas/${id}`, body);
  return data;
}

export async function deletePlanoConta(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/plano-contas/${id}`, {
    data: { password },
  });
  return res;
}

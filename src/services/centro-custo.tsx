// import api from "./api";
import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { ICentroCusto } from "@/interfaces/centro-custo";
import axios from "axios";
import { api } from "./api";

export async function fetchCentroCustoAll(
  filters: IFilterQry
): Promise<IResponse<ICentroCusto>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/centro-custos`, { params });
  return data;
}

export async function fetchCentroCustoOne(id: string): Promise<ICentroCusto> {
  const { data } = await api.get(`/centro-custos/${id}`);
  return data;
}

export async function createCentroCusto(
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/centro-custos", body);
  return data;
}

export async function updateCentroCusto(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/centro-custos/${id}`, body);
  return data;
}

export async function deleteCentroCusto(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/centro-custos/${id}`, {
    data: { password },
  });
  return res;
}

// import api from "./api";
import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { ICentroCusto } from "@/interfaces/centro-custo";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL da API
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjOGE5YzlkNC0xMDI5LTQyZjUtOTZkYi00YjliMzgyMTBkYWIiLCJlbWFpbCI6InRlc3RlQG1zMXNpc3RlbWFzLmNvbS5iciIsInR5cGUiOiJhY2Nlc3MiLCJtb2R1bG8iOjMsImlkIjoxLCJub21lIjoiVGVzdGUiLCJyYW1hbCI6IjIwMyIsImlhdCI6MTc1MDI3MDE1MSwiZXhwIjoxNzUwMjc3MzUxfQ.a8_e-f_EUtVgixLLpQu0_vk_ibHN0HVLFYxUt9euXSA",
  },
});

export async function fetchCentroCustoAll(
  filters: IFilterQry
): Promise<IResponse<ICentroCusto>> {
  const params: Record<string, string | number> = {};

  if (filters.page !== undefined) params.page = filters.page;
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

export async function createCentroCusto(body: any): Promise<IResponseFetch> {
  const { data } = await api.post("/centro-custos", body);
  return data;
}

export async function updateCentroCusto(
  id: string,
  body: any
): Promise<IResponseFetch> {
  const { data } = await api.patch(`/centro-custos/${id}`, body);
  return data;
}

export async function deleteCentroCusto(
  id: string,
  password: string
): Promise<IResponseFetch> {
  const { data: res } = await api.delete(`/centro-custos/${id}`, {
    data: { password },
  });
  return res;
}

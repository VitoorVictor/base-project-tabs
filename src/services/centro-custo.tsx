// import api from "./api";
import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { ICentroCusto } from "@/interfaces/centro-custo";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL da API
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjOGE5YzlkNC0xMDI5LTQyZjUtOTZkYi00YjliMzgyMTBkYWIiLCJlbWFpbCI6InRlc3RlQG1zMXNpc3RlbWFzLmNvbS5iciIsInR5cGUiOiJhY2Nlc3MiLCJtb2R1bG8iOjMsImlkIjoxLCJub21lIjoiVGVzdGUiLCJyYW1hbCI6IjIwMyIsImlhdCI6MTc1MDE2NjUxMywiZXhwIjoxNzUwMTczNzEzfQ.mr0CYmaZ7WEceN7yZ4C0wNOawV6HUNS0qhbA18GRTaU",
  },
});

export const serviceCentroCusto = {
  getAll: async (filters: IFilterQry): Promise<IResponse<ICentroCusto>> => {
    const params: Record<string, string | number> = {};

    if (filters.page !== undefined) params.page = filters.page;
    if (filters.type) params.type = filters.type.toUpperCase();
    if (filters.order) params.order = filters.order;
    if (filters.search) params.descricao = filters.search;

    try {
      const response = await api.get(`/centro-custos`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getOne: async (id: string): Promise<ICentroCusto> => {
    try {
      const response = await api.get(`/centro-custos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data: any): Promise<IResponseFetch> => {
    try {
      const response = await api.post("/centro-custos", data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  update: async (id: string, data: any): Promise<IResponseFetch> => {
    try {
      const response = await api.patch(`/centro-custos/${id}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  delete: async (id: string, body: {}): Promise<IResponseFetch> => {
    try {
      const response = await api.delete(`/centro-custos/${id}`, { data: body });
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

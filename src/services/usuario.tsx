import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import { Permission } from "@/store/permissionStore";
import { IUsuario } from "@/interfaces/usuario";
import { api } from "./api";

export async function fetchUsuarioAll(
  filters: IFilterQry
): Promise<IResponse<IUsuario>> {
  const params: Record<string, string | number> = {};

  if (filters.page) params.page = filters.page;
  if (filters.type) params.type = filters.type.toUpperCase();
  if (filters.order) params.order = filters.order;
  if (filters.search) params.descricao = filters.search;

  const { data } = await api.get(`/usuarios`, { params });
  return data;
}

export async function fetchUsuarioOne(id: string): Promise<IUsuario> {
  const { data } = await api.get(`/usuarios/${id}`);
  return data;
}

export async function createUsuario(body: any): Promise<IResponseFetch<any>> {
  const { data } = await api.post("/usuarios", body);
  return data;
}

export async function updateUsuario(
  id: string,
  body: any
): Promise<IResponseFetch<any>> {
  const { data } = await api.patch(`/usuarios/${id}`, body);
  return data;
}

export async function deleteUsuario(
  id: string,
  password: string
): Promise<IResponseFetch<any>> {
  const { data: res } = await api.delete(`/usuarios/${id}`, {
    data: { password },
  });
  return res;
}

export async function fetchUsuarioPermissao(): Promise<Permission[]> {
  const { data } = await api.post("/usuarios/permissao");
  return data;
}

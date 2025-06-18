import { Permission } from "@/store/permissionStore";
import { api } from "./api";

export async function fetchUsuarioPermissao(): Promise<Permission[]> {
  const { data } = await api.post("/usuarios/permissao");
  return data;
}

import { IAnexo } from "@/interfaces/anexo";
import { api } from "./api";
import { IResponseFetch } from "@/interfaces/comum";

export async function fetchAnexoAll(
  tipoAnexo: string,
  id: number
): Promise<IAnexo[]> {
  const { data } = await api.get(`/${tipoAnexo}/anexos/${id}`);
  return data;
}

export async function createAnexo(
  tipoAnexo: string,
  formData: FormData
): Promise<IResponseFetch<any>> {
  const { data } = await api.post(`/${tipoAnexo}/anexo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteAnexo(
  tipoAnexo: string,
  id: string,
  body: {}
): Promise<IResponseFetch<any>> {
  const { data } = await api.delete(`/${tipoAnexo}/anexo/${id}`, {
    data: body,
  });
  return data;
}

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
  password: string
): Promise<IResponseFetch<any>> {
  const { data } = await api.delete(`/${tipoAnexo}/anexo/${id}`, {
    data: { password: password },
  });
  return data;
}

export async function getAssinatura(
  id: string
): Promise<{ assinatura: string }> {
  const { data } = await api.get(`/anexos/gera-assinatura-anexo/${id}`);
  return data;
}

export async function getLinkAnexo(
  id: string,
  assinatura: string
): Promise<Blob> {
  const { data } = await api.get(
    `/anexos/${id}?id=${id}&assinatura=${assinatura}`,
    {
      responseType: "blob",
    }
  );
  return data;
}

import {
  fetchAnexoAll,
  createAnexo,
  deleteAnexo,
  getAssinatura,
  getLinkAnexo,
} from "@/services/anexo";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IAnexo } from "@/interfaces/anexo";

const ANEXO_KEY = "anexo";

export function useAnexos(
  tipoAnexo: string,
  id: number,
  options?: UseQueryOptions<IAnexo[]>
) {
  return useQuery({
    queryKey: [ANEXO_KEY, tipoAnexo, id],
    queryFn: () => fetchAnexoAll(tipoAnexo, id),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useCreateAnexo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tipoAnexo,
      formData,
    }: {
      tipoAnexo: string;
      formData: FormData;
    }) => createAnexo(tipoAnexo, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANEXO_KEY] });
    },
  });
}

export function useDeleteAnexo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tipoAnexo,
      id,
      password,
    }: {
      tipoAnexo: string;
      id: string;
      password: string;
    }) => deleteAnexo(tipoAnexo, id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANEXO_KEY] });
    },
  });
}

export function useAnexoAssinatura(id: string, enabled?: boolean) {
  return useQuery<{ assinatura: string }>({
    enabled,
    queryKey: [ANEXO_KEY, id],
    queryFn: () => getAssinatura(id),
  });
}

export function useAnexoLink(
  id: string,
  assinatura: string,
  enabled?: boolean
) {
  return useQuery<Blob>({
    enabled,
    queryKey: [ANEXO_KEY, id, assinatura],
    queryFn: () => getLinkAnexo(id, assinatura),
  });
}

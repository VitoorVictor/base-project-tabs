import {
  fetchPessoaTipoContatoAll,
  fetchPessoaTipoContatoOne,
  createPessoaTipoContato,
  updatePessoaTipoContato,
  deletePessoaTipoContato,
} from "@/services/pessoa-tipo-contato";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoaTipoContato } from "@/interfaces/pessoa-tipo-contato";

const PESSOA_TIPO_CONTATO_KEY = "pessoa_tipo_contato";

export function usePessoaTipoContatos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoaTipoContato>>
) {
  return useQuery({
    queryKey: [PESSOA_TIPO_CONTATO_KEY, filters],
    queryFn: () => fetchPessoaTipoContatoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoaTipoContato(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_TIPO_CONTATO_KEY, id],
    queryFn: () => fetchPessoaTipoContatoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoaTipoContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoaTipoContato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_CONTATO_KEY] });
    },
  });
}

export function useUpdatePessoaTipoContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoaTipoContato(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_CONTATO_KEY] });
    },
  });
}

export function useDeletePessoaTipoContato() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoaTipoContato(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_CONTATO_KEY] });
    },
  });
}

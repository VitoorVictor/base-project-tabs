import {
  fetchRecpagClassificacaoAll,
  fetchRecpagClassificacaoOne,
  createRecpagClassificacao,
  updateRecpagClassificacao,
  deleteRecpagClassificacao,
} from "@/services/recpag-classificacao";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IRecpagClassificacao } from "@/interfaces/recpag-classificacao";

const RECPAG_CLASSIFICACAO_KEY = "recpag-classificacao";

export function useRecpagClassificacoes(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IRecpagClassificacao>>
) {
  return useQuery({
    queryKey: [RECPAG_CLASSIFICACAO_KEY, filters],
    queryFn: () => fetchRecpagClassificacaoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useRecpagClassificacao(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [RECPAG_CLASSIFICACAO_KEY, id],
    queryFn: () => fetchRecpagClassificacaoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateRecpagClassificacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecpagClassificacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_CLASSIFICACAO_KEY] });
    },
  });
}

export function useUpdateRecpagClassificacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateRecpagClassificacao(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_CLASSIFICACAO_KEY] });
    },
  });
}

export function useDeleteRecpagClassificacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteRecpagClassificacao(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_CLASSIFICACAO_KEY] });
    },
  });
}

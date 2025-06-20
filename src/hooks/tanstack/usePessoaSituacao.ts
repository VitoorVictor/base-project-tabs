import {
  fetchPessoaSituacaoAll,
  fetchPessoaSituacaoOne,
  createPessoaSituacao,
  updatePessoaSituacao,
  deletePessoaSituacao,
} from "@/services/pessoa-situacao";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoaSituacao } from "@/interfaces/pessoa-situacao";

const PESSOA_SITUACAO_KEY = "pessoa-situacao";

export function usePessoaSituacoes(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoaSituacao>>
) {
  return useQuery({
    queryKey: [PESSOA_SITUACAO_KEY, filters],
    queryFn: () => fetchPessoaSituacaoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoaSituacao(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_SITUACAO_KEY, id],
    queryFn: () => fetchPessoaSituacaoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoaSituacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoaSituacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_SITUACAO_KEY] });
    },
  });
}

export function useUpdatePessoaSituacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoaSituacao(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_SITUACAO_KEY] });
    },
  });
}

export function useDeletePessoaSituacao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoaSituacao(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_SITUACAO_KEY] });
    },
  });
}

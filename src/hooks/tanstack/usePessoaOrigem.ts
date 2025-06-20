import {
  fetchPessoaOrigemAll,
  fetchPessoaOrigemOne,
  createPessoaOrigem,
  updatePessoaOrigem,
  deletePessoaOrigem,
} from "@/services/pessoa-origem";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoaOrigem } from "@/interfaces/pessoa-origem";

const PESSOA_ORIGEM_KEY = "pessoa-origem";

export function usePessoaOrigens(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoaOrigem>>
) {
  return useQuery({
    queryKey: [PESSOA_ORIGEM_KEY, filters],
    queryFn: () => fetchPessoaOrigemAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoaOrigem(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_ORIGEM_KEY, id],
    queryFn: () => fetchPessoaOrigemOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoaOrigem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoaOrigem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_ORIGEM_KEY] });
    },
  });
}

export function useUpdatePessoaOrigem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoaOrigem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_ORIGEM_KEY] });
    },
  });
}

export function useDeletePessoaOrigem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoaOrigem(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_ORIGEM_KEY] });
    },
  });
}

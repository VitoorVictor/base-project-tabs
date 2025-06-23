import {
  fetchPessoaAll,
  fetchPessoaOne,
  createPessoa,
  updatePessoa,
  deletePessoa,
} from "@/services/pessoa";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoa } from "@/interfaces/pessoa";

const PESSOA_KEY = "pessoa";

export function usePessoas(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoa>>
) {
  return useQuery({
    queryKey: [PESSOA_KEY, filters],
    queryFn: () => fetchPessoaAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoa(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_KEY, id],
    queryFn: () => fetchPessoaOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_KEY] });
    },
  });
}

export function useUpdatePessoa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_KEY] });
    },
  });
}

export function useDeletePessoa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoa(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_KEY] });
    },
  });
}

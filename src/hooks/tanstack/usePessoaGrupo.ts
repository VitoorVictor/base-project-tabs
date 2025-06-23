import {
  fetchPessoaGrupoAll,
  fetchPessoaGrupoOne,
  createPessoaGrupo,
  updatePessoaGrupo,
  deletePessoaGrupo,
} from "@/services/pessoa-grupo";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoaGrupo } from "@/interfaces/pessoa-grupo";

const PESSOA_GRUPO_KEY = "pessoa-grupo";

export function usePessoaGrupos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoaGrupo>>
) {
  return useQuery({
    queryKey: [PESSOA_GRUPO_KEY, filters],
    queryFn: () => fetchPessoaGrupoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoaGrupo(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_GRUPO_KEY, id],
    queryFn: () => fetchPessoaGrupoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoaGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoaGrupo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_GRUPO_KEY] });
    },
  });
}

export function useUpdatePessoaGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoaGrupo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_GRUPO_KEY] });
    },
  });
}

export function useDeletePessoaGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoaGrupo(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_GRUPO_KEY] });
    },
  });
}

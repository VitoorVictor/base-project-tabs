import {
  fetchPessoaTipoEnderecoAll,
  fetchPessoaTipoEnderecoOne,
  createPessoaTipoEndereco,
  updatePessoaTipoEndereco,
  deletePessoaTipoEndereco,
} from "@/services/pessoa-tipo-endereco";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPessoaTipoEndereco } from "@/interfaces/pessoa-tipo-endereco";

const PESSOA_TIPO_ENDERECO_KEY = "pessoa_tipo_endereco";

export function usePessoaTipoEnderecos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPessoaTipoEndereco>>
) {
  return useQuery({
    queryKey: [PESSOA_TIPO_ENDERECO_KEY, filters],
    queryFn: () => fetchPessoaTipoEnderecoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePessoaTipoEndereco(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PESSOA_TIPO_ENDERECO_KEY, id],
    queryFn: () => fetchPessoaTipoEnderecoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePessoaTipoEndereco() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPessoaTipoEndereco,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_ENDERECO_KEY] });
    },
  });
}

export function useUpdatePessoaTipoEndereco() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePessoaTipoEndereco(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_ENDERECO_KEY] });
    },
  });
}

export function useDeletePessoaTipoEndereco() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePessoaTipoEndereco(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PESSOA_TIPO_ENDERECO_KEY] });
    },
  });
}

import {
  fetchEmpresaAll,
  fetchEmpresaOne,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
} from "@/services/empresa";
import { IEmpresa } from "@/interfaces/empresa";
import { IFilterQry } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";

const EMPRESA_KEY = "empresa";

export function useEmpresas(
  filters: IFilterQry,
  options?: UseQueryOptions <IEmpresa[]>
) {
  return useQuery({
    queryKey: [EMPRESA_KEY, filters],
    queryFn: () => fetchEmpresaAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useEmpresa(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [EMPRESA_KEY, id],
    queryFn: () => fetchEmpresaOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmpresa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPRESA_KEY] });
    },
  });
}

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEmpresa(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPRESA_KEY] });
    },
  });
}

export function useDeleteEmpresa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteEmpresa(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPRESA_KEY] });
    },
  });
}

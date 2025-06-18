import {
  fetchMarcaAll,
  fetchMarcaOne,
  createMarca,
  updateMarca,
  deleteMarca,
} from "@/services/marca";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IMarca } from "@/interfaces/marca";

const MARCA_KEY = "marca";

export function useMarcas(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IMarca>>
) {
  return useQuery({
    queryKey: [MARCA_KEY, filters],
    queryFn: () => fetchMarcaAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useMarca(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [MARCA_KEY, id],
    queryFn: () => fetchMarcaOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateMarca() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMarca,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARCA_KEY] });
    },
  });
}

export function useUpdateMarca() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateMarca(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARCA_KEY] });
    },
  });
}

export function useDeleteMarca() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteMarca(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARCA_KEY] });
    },
  });
}

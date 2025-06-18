// hooks/useCentroCusto.ts
import {
  fetchCentroCustoAll,
  fetchCentroCustoOne,
  createCentroCusto,
  updateCentroCusto,
  deleteCentroCusto,
} from "@/services/centro-custo";
import { ICentroCusto } from "@/interfaces/centro-custo";
import { IFilterQry, IResponse, IResponseFetch } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";

const CENTRO_CUSTO_KEY = "centro-custo";

export function useCentroCustos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<ICentroCusto>>
) {
  return useQuery({
    queryKey: [CENTRO_CUSTO_KEY, filters],
    queryFn: () => fetchCentroCustoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useCentroCusto(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [CENTRO_CUSTO_KEY, id],
    queryFn: () => fetchCentroCustoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateCentroCusto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCentroCusto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_KEY] });
    },
  });
}

export function useUpdateCentroCusto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCentroCusto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_KEY] });
    },
  });
}

export function useDeleteCentroCusto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteCentroCusto(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CENTRO_CUSTO_KEY] });
    },
  });
}

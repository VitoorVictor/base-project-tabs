import {
  fetchPlanoContaAll,
  fetchPlanoContaOne,
  createPlanoConta,
  updatePlanoConta,
  deletePlanoConta,
} from "@/services/plano-conta";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IPlanoConta } from "@/interfaces/plano-conta";

const PLANO_CONTA_KEY = "plano-conta";

export function usePlanoContas(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IPlanoConta>>
) {
  return useQuery({
    queryKey: [PLANO_CONTA_KEY, filters],
    queryFn: () => fetchPlanoContaAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function usePlanoConta(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [PLANO_CONTA_KEY, id],
    queryFn: () => fetchPlanoContaOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreatePlanoConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlanoConta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_CONTA_KEY] });
    },
  });
}

export function useUpdatePlanoConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updatePlanoConta(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_CONTA_KEY] });
    },
  });
}

export function useDeletePlanoConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deletePlanoConta(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANO_CONTA_KEY] });
    },
  });
}

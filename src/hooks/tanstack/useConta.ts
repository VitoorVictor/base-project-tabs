import {
  fetchContaAll,
  fetchContaOne,
  createConta,
  updateConta,
  deleteConta,
} from "@/services/conta";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IConta } from "@/interfaces/conta";

const CONTA_KEY = "conta";

export function useContas(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IConta>>
) {
  return useQuery({
    queryKey: [CONTA_KEY, filters],
    queryFn: () => fetchContaAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useConta(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [CONTA_KEY, id],
    queryFn: () => fetchContaOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTA_KEY] });
    },
  });
}

export function useUpdateConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateConta(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTA_KEY] });
    },
  });
}

export function useDeleteConta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteConta(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTA_KEY] });
    },
  });
}

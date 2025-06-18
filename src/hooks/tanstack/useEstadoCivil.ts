import {
  fetchEstadoCivilAll,
  fetchEstadoCivilOne,
  createEstadoCivil,
  updateEstadoCivil,
  deleteEstadoCivil,
} from "@/services/estado-civil";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IEstadoCivil } from "@/interfaces/estado-civil";

const ESTADO_CIVIL_KEY = "estado-civil";

export function useEstadoCivils(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IEstadoCivil>>
) {
  return useQuery({
    queryKey: [ESTADO_CIVIL_KEY, filters],
    queryFn: () => fetchEstadoCivilAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useEstadoCivil(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [ESTADO_CIVIL_KEY, id],
    queryFn: () => fetchEstadoCivilOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateEstadoCivil() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEstadoCivil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ESTADO_CIVIL_KEY] });
    },
  });
}

export function useUpdateEstadoCivil() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateEstadoCivil(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ESTADO_CIVIL_KEY] });
    },
  });
}

export function useDeleteEstadoCivil() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteEstadoCivil(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ESTADO_CIVIL_KEY] });
    },
  });
}

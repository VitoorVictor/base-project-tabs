import {
  fetchGrupoAll,
  fetchGrupoOne,
  createGrupo,
  updateGrupo,
  deleteGrupo,
} from "@/services/grupo";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IGrupo } from "@/interfaces/grupo";

const GRUPO_KEY = "grupo";

export function useGrupos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IGrupo>>
) {
  return useQuery({
    queryKey: [GRUPO_KEY, filters],
    queryFn: () => fetchGrupoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useGrupo(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [GRUPO_KEY, id],
    queryFn: () => fetchGrupoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGrupo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRUPO_KEY] });
    },
  });
}

export function useUpdateGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateGrupo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRUPO_KEY] });
    },
  });
}

export function useDeleteGrupo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteGrupo(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GRUPO_KEY] });
    },
  });
}

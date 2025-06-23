import {
  fetchUsuarioAll,
  fetchUsuarioOne,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "@/services/usuario";
import { IUsuario } from "@/interfaces/usuario";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";

const USUARIO_KEY = "usuario";

export function useUsuarios(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IUsuario>>
) {
  return useQuery({
    queryKey: [USUARIO_KEY, filters],
    queryFn: () => fetchUsuarioAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useUsuario(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [USUARIO_KEY, id],
    queryFn: () => fetchUsuarioOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USUARIO_KEY] });
    },
  });
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USUARIO_KEY] });
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteUsuario(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USUARIO_KEY] });
    },
  });
}

import {
  fetchRecpagDocumentoTipoAll,
  fetchRecpagDocumentoTipoOne,
  createRecpagDocumentoTipo,
  updateRecpagDocumentoTipo,
  deleteRecpagDocumentoTipo,
} from "@/services/recpag-documento-tipo";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { IRecpagDocumentoTipo } from "@/interfaces/recpag-documento-tipo";

const RECPAG_DOCUMENTO_TIPO_KEY = "recpag-documento-tipo";

export function useRecpagDocumentoTipos(
  filters: IFilterQry,
  options?: UseQueryOptions<IResponse<IRecpagDocumentoTipo>>
) {
  return useQuery({
    queryKey: [RECPAG_DOCUMENTO_TIPO_KEY, filters],
    queryFn: () => fetchRecpagDocumentoTipoAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useRecpagDocumentoTipo(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [RECPAG_DOCUMENTO_TIPO_KEY, id],
    queryFn: () => fetchRecpagDocumentoTipoOne(id),
    placeholderData: keepPreviousData,
  });
}

export function useCreateRecpagDocumentoTipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecpagDocumentoTipo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_DOCUMENTO_TIPO_KEY] });
    },
  });
}

export function useUpdateRecpagDocumentoTipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateRecpagDocumentoTipo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_DOCUMENTO_TIPO_KEY] });
    },
  });
}

export function useDeleteRecpagDocumentoTipo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      deleteRecpagDocumentoTipo(id, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECPAG_DOCUMENTO_TIPO_KEY] });
    },
  });
}

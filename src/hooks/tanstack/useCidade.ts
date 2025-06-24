import { fetchCidadeAll, fetchCidadeOne } from "@/services/cidade";
import { ICidade } from "@/interfaces/cidade";
import { IFilterQry, IResponse } from "@/interfaces/comum";
import {
  useQuery,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";

export const CIDADE_KEY = "cidade";

export function useCidades(
  filters: IFilterQry,
  options?: UseQueryOptions<ICidade[]>
) {
  return useQuery({
    queryKey: [CIDADE_KEY, filters],
    queryFn: () => fetchCidadeAll(filters),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useCidade(id: string, enabled = true) {
  return useQuery({
    enabled,
    queryKey: [CIDADE_KEY, id],
    queryFn: () => fetchCidadeOne(id),
    placeholderData: keepPreviousData,
  });
}

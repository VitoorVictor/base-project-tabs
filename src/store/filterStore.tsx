import { create } from "zustand";

type Filters = {
  order?: string;
  type?: "asc" | "desc";
  page?: number;
  search?: string;
};

type FilterStore = {
  filters: Record<string, Filters>;
  setFilters: (tabKey: string, newFilters: Partial<Filters>) => void;
  resetFilters: (tabKey: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilters: (tabKey, newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [tabKey]: {
          ...state.filters[tabKey],
          ...newFilters,
        },
      },
    })),
  resetFilters: (tabKey) =>
    set((state) => {
      const newFilters = { ...state.filters };
      delete newFilters[tabKey];
      return { filters: newFilters };
    }),
}));

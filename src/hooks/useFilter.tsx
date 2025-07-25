import { StockProduct } from "@prisma/client";
import { create } from "zustand";

export type TFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: StockProduct[] | null;
  brands?: number[] | null;
  locations?: number[] | null;
  categories?: number[] | null;
};

export interface FilterState {
  filter: TFilter;
  setFilter: (filter: TFilter) => void;
}

export const useFilter = create<FilterState>()((set) => ({
  filter: {
    search: "",
    minPrice: 0,
    maxPrice: 0,
    stock: null,
    brands: null,
    categories: null,
    locations: null,
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),
}));

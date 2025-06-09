import { TFilter } from "@/hooks/useFilter";
import { TProduct } from "@/types";

export async function fetchProducts(body?: TFilter): Promise<TProduct[]> {
  try {
    const res = await fetch("/api/catalog", {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    });

    const data = await res.json();

    return data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

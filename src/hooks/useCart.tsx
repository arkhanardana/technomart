import { TCart } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  products: TCart[];
  addProduct: (cart: TCart) => void;
  incQuantity: (id: number) => void;
  decQuantity: (id: number) => void;
  removeProduct: (id: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (cart) =>
        set({
          products: [...get().products.filter((item) => item.id !== cart.id), cart],
        }),
      incQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        set({
          products: newProducts,
        });
      },
      decQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        });

        set({
          products: newProducts.filter((item) => item.quantity !== 0),
        });
      },
      removeProduct: (id) =>
        set({
          products: [...get().products.filter((item) => item.id !== id)],
        }),
    }),
    {
      name: "cart-product-technomart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

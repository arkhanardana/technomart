"use client";
import { useCart } from "@/hooks/useCart";

export default function Notif() {
  const { products } = useCart();

  return (
    <>
      {products.length !== 0 && (
        <p className="w-6 h-6 left-8 flex items-center justify-center rounded-full bg-[#FFC736] relative">
          {products.length}
        </p>
      )}
    </>
  );
}

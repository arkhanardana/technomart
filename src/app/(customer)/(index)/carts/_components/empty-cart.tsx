"use client";
import { useCart } from "@/hooks/useCart";
import React from "react";

export default function EmptyCart() {
  const { products } = useCart();
  return (
    <>
      {products.length === 0 && (
        <div className="flex items-center justify-center mt-4 lg:mt-24">
          <h1 className="text-center">Your cart is empty.</h1>
        </div>
      )}
    </>
  );
}

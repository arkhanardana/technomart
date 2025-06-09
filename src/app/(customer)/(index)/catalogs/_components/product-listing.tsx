"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProducts } from "../lib/data";
import CardProduct from "../../_components/card-product";

export default function ProductListing() {
  const { data, isLoading } = useQuery({
    queryKey: ["product-listing"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[30px]">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data?.map((product) => <CardProduct key={product.id} item={product} />)}
    </div>
  );
}

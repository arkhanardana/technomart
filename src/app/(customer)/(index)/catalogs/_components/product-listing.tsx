"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProducts } from "../lib/data";
import CardProduct from "../../_components/card-product";
import { useFilter } from "@/hooks/useFilter";

export default function ProductListing() {
  const { filter } = useFilter();
  const { data, isLoading } = useQuery({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchProducts(filter),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[30px]">
        <span>Loading...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-[30px]">
        <span>Not found</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data.map((product) => (
        <div className="" key={product.id}>
          <CardProduct item={product} />
        </div>
      ))}
    </div>
  );
}

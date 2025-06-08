import { getBrands } from "@/app/(admin)/dashboard/(index)/brands/lib/data";
import React from "react";
import FilterCheckbox from "./filter-checkbox";

export default async function FilterBrands() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Brands</p>
      {brands.map((item) => (
        <FilterCheckbox
          key={item.id}
          id={item.id.toString()}
          value={item.name}
          type="brand"
        />
      ))}
    </div>
  );
}

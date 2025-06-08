import { getCategories } from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import React from "react";
import FilterCheckbox from "./filter-checkbox";

export default async function FilterCategory() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Categories</p>
      {categories.map((item) => (
        <FilterCheckbox
          key={item.id}
          type="category"
          id={item.id.toString()}
          value={item.name}
        />
      ))}
    </div>
  );
}

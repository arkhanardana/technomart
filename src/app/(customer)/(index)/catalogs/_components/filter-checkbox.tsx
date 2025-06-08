"use client";

import { useFilter } from "@/hooks/useFilter";
import { StockProduct } from "@prisma/client";
import React, { ChangeEvent } from "react";

interface FilterCheckboxProps {
  id: string;
  value: string;
  type: "stock" | "brand" | "location" | "category";
}

export default function FilterCheckbox({
  id,
  value,
  type,
}: FilterCheckboxProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "stock":
        if (e.target.checked) {
          setFilter({
            stock: [...(filter?.stock ?? []), e.target.value as StockProduct],
          });
        } else {
          setFilter({
            stock: filter.stock?.filter((value) => value !== e.target.value),
          });
        }
        break;

      case "brand":
        if (e.target.checked) {
          setFilter({
            brands: [
              ...(filter?.brands ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            brands: filter.brands?.filter(
              (value) => value !== Number.parseInt(e.target.value)
            ),
          });
        }

      case "category":
        if (e.target.checked) {
          setFilter({
            categories: [
              ...(filter?.categories ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            categories: filter.categories?.filter(
              (value) => value !== Number.parseInt(e.target.value)
            ),
          });
        }
      default:

      case "location":
        if (e.target.checked) {
          setFilter({
            locations: [
              ...(filter?.locations ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            locations: filter.locations?.filter(
              (value) => value !== Number.parseInt(e.target.value)
            ),
          });
        }
        break;
    }
  };

  return (
    <label
      htmlFor={id + value}
      className="font-semibold flex items-center gap-3"
    >
      <input
        id={id + value}
        type="checkbox"
        onChange={onChange}
        value={id}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
      />
      <span>{value}</span>
    </label>
  );
}

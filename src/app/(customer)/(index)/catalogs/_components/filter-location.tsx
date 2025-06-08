import { getLocations } from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import React from "react";
import FilterCheckbox from "./filter-checkbox";

export default async function FilterLocation() {
  const locations = await getLocations();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Locations</p>
      {locations.map((item) => (
        <FilterCheckbox
          key={item.id}
          type="location"
          id={item.id.toString()}
          value={item.name}
        />
      ))}
    </div>
  );
}

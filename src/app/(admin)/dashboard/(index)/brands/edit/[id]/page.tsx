import React from "react";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/navigation";
import { Params } from "@/types";

export default async function EditPage({ params }: Params<{ id: string }>) {
  const data = await getBrandById(params.id);

  if (!data) {
    return redirect("/dashboard/brands");
  }

  return (
    <div className="lg:pl-52">
      <FormBrand data={data} type="EDIT" />
    </div>
  );
}

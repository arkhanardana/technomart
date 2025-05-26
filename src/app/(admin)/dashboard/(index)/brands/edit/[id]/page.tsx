import React from "react";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const data = await getBrandById(params.id);

  if (!data) {
    return redirect("/dashboard/brands");
  }

  return (
    <div>
      <FormBrand data={data} type="EDIT" />
    </div>
  );
}

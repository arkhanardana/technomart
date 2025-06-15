import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";
import { Params } from "@/types";

export default async function EditPage({ params }: Params<{ id: string }>) {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return (
    <div>
      <FormCategory data={data} type="EDIT" />
    </div>
  );
}

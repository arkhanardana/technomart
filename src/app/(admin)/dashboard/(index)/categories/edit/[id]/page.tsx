import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";

export default async function EditPage({ params }: { params: { id: string } }) {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <FormCategory data={data} type="EDIT" />
    </div>
  );
}

import React from "react";
import { getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormLocation from "../../_components/form-location";
import { Params } from "@/types";

export default async function EditPage({ params }: Params<{ id: string }>) {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <FormLocation data={data} type="EDIT" />
    </div>
  );
}

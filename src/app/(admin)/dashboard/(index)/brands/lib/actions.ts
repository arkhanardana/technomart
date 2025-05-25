"use server";

import db from "@/lib/db";
import { schemaBrand } from "@/lib/schema";
import { uploadImage } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  try {
    const fileName = await uploadImage(validated.data.image, "brands");

    await db.brand.create({
      data: {
        name: validated.data.name,
        logo: fileName,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to insert brand",
    };
  }
  return redirect("/dashboard/brands");
}

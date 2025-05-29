"use server";

import db from "@/lib/db";
import { schemaBrand, schemaUpdateBrand } from "@/lib/schema";
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
      error: "Failed to post brand",
    };
  }
  return redirect("/dashboard/brands");
}

export async function updateBrand(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const fileUpload = formData.get("image") as File;

  const validate = schemaUpdateBrand.safeParse({
    name: formData.get("name"),
    image: fileUpload,
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const brand = await db.brand.findFirst({
    where: {
      id: id,
    },
    select: {
      logo: true,
    },
  });

  let filename = brand?.logo;

  if (fileUpload && fileUpload.size > 0) {
    filename = await uploadImage(fileUpload, "brands");
  }

  try {
    await db.brand.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        logo: filename,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update brand",
    };
  }

  return redirect("/dashboard/brands");
}

export async function deleteBrand(id: number) {
  try {
    await db.brand.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to delete brand",
    };
  }

  return redirect("/dashboard/brands");
}

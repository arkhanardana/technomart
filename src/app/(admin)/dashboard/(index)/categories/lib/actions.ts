"use server";

import db from "@/lib/db";
import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaCategory.safeParse({ name: formData.get("name") });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }
  try {
    await db.category.create({ data: { name: validated.data.name } });
  } catch (error) {
    return {
      error: "Failed to insert category",
    };
  }

  return redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validated = schemaCategory.safeParse({ name: formData.get("name") });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  if (id === undefined) {
    return {
      error: "Category not found",
    };
  }

  try {
    await db.category.update({
      where: { id },
      data: { name: validated.data.name },
    });
  } catch (error) {
    return {
      error: "Failed to update category",
    };
  }
  return redirect("/dashboard/categories/");
}

export async function deleteCategory(id: number) {
  try {
    await db.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete category",
    };
  }

  return redirect("/dashboard/categories");
}

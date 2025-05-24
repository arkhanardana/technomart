"use server";

import db from "@/lib/db";
import { schemaLocation } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";

export async function postLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaLocation.safeParse({ name: formData.get("name") });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }
  try {
    await db.location.create({ data: { name: validated.data.name } });
  } catch (error) {
    return {
      error: "Failed to update location",
    };
  }

  return redirect("/dashboard/locations");
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validated = schemaLocation.safeParse({ name: formData.get("name") });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  if (id === undefined) {
    return {
      error: "Location not found",
    };
  }

  try {
    await db.location.update({
      where: { id },
      data: { name: validated.data.name },
    });
  } catch (error) {
    return {
      error: "Failed to update location",
    };
  }
  return redirect("/dashboard/locations");
}

export async function deleteLocation(id: number) {
  try {
    await db.location.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete location",
    };
  }

  return redirect("/dashboard/locations");
}

"use server";

import db from "@/lib/db";
import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadImage } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { StockProduct } from "@prisma/client";
import { redirect } from "next/navigation";

export async function postProducts(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }
  const uploadedImages = validated.data.images as File[];
  const filenames = [];

  for (const image of uploadedImages) {
    const fileName = await uploadImage(image, "products");
    filenames.push(fileName);
  }

  try {
    await db.product.create({
      data: {
        name: validated.data.name,
        price: Number.parseInt(validated.data.price),
        description: validated.data.description,
        brand_id: Number.parseInt(validated.data.brand_id),
        category_id: Number.parseInt(validated.data.category_id),
        location_id: Number.parseInt(validated.data.location_id),
        stock: validated.data.stock as StockProduct,
        images: filenames,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to post product",
    };
  }

  return redirect("/dashboard/products");
}

export async function updateProducts(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const validated = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    id: id,
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  const product = await db.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  const uploadedImages = formData.getAll("images") as File[];
  let filenames = [];

  if (uploadedImages.length === 3) {
    const parseImages = schemaProduct.pick({ images: true }).safeParse({
      images: uploadedImages,
    });

    if (!parseImages.success) {
      return {
        error: parseImages.error.errors[0].message,
      };
    }

    for (const image of uploadedImages) {
      const fileName = await uploadImage(image, "products");
      filenames.push(fileName);
    }
  } else {
    filenames = product.images;
  }

  try {
    await db.product.update({
      where: {
        id,
      },

      data: {
        name: validated.data.name,
        price: Number.parseInt(validated.data.price),
        description: validated.data.description,
        brand_id: Number.parseInt(validated.data.brand_id),
        category_id: Number.parseInt(validated.data.category_id),
        location_id: Number.parseInt(validated.data.location_id),
        stock: validated.data.stock as StockProduct,
        images: filenames,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to update product",
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(id: number): Promise<ActionResult> {
  const product = await db.product.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      images: true,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  for (const image of product.images) {
    await deleteFile(image, "products");
  }

  try {
    await db.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to delete product",
    };
  }

  return redirect("/dashboard/products");
}

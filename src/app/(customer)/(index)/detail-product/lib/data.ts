import db from "@/lib/db";
import { getImageUrl } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function getProductsDetails(id: number) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            orders: true,
          },
        },
        images: true,
        description: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return redirect("/");
    }

    return {
      ...product,
      images: product.images.map((pro) => {
        return getImageUrl(pro, "products");
      }),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

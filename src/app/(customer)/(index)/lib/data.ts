import db from "@/lib/db";
import { getImageUrl } from "@/lib/supabase";

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      select: {
        images: true,
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });

    const response = products.map((pro) => {
      return {
        ...pro,
        images: getImageUrl(pro.images[0], "products"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

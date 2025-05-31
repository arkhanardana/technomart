import db from "@/lib/db";
import { TProduct } from "../columns";

export async function getAllProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        images: true,
        _count: {
          select: {
            orders: true,
          },
        },
        created_at: true,
      },
    });

    const response_products: TProduct[] = products.map((product) => ({
      brand_name: product.brand.name,
      category_name: product.category.name,
      createdAt: product.created_at,
      image_url: product.images[0],
      id: product.id,
      name: product.name,
      price: Number(product.price),
      stock: product.stock,
      total_sales: product._count.orders,
    }));

    return response_products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

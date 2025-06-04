import db from "@/lib/db";
import { TColumn } from "../columns";
import { getImageUrl } from "@/lib/supabase";

export async function getAllOrders() {
  try {
    const orders = await db.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const response: TColumn[] = orders.map((order) => {
      return {
        id: order.id,
        customer_name: order.user.name,
        price: Number(order.total),
        product: order.products?.map((item) => {
          return {
            name: item.product.name,
            image: getImageUrl(item.product.images[0]),
          };
        }),
        status: order.status,
      };
    });

    return response;
  } catch (error) {
    console.log(error);

    return [];
  }
}

import db from "@/lib/db";
import { TColumn } from "../columns";

export async function getAllCustomers() {
  try {
    const customers = await db.user.findMany({
      where: {
        role: "customer",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const response: TColumn[] = customers.map((cust) => {
      return {
        id: cust.id,
        name: cust.name,
        email: cust.email,
        total_transactions: cust._count.orders,
      };
    });

    return response;
  } catch (error) {
    console.log(error);

    return [];
  }
}

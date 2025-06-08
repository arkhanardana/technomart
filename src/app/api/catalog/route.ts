import { TFilter } from "@/hooks/useFilter";
import db from "@/lib/db";
import { getImageUrl } from "@/lib/supabase";
import { TProduct } from "@/types";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const response = (await req.json()) as TFilter;

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (response.search !== "") {
      ORQuery.push({
        name: {
          contains: response.search,
          mode: "insensitive",
        },
      });
    }

    if (response.minPrice && response.minPrice > 0) {
      ORQuery.push({
        price: {
          gte: response.minPrice,
        },
      });
    }

    if (response.maxPrice && response.maxPrice > 0) {
      ORQuery.push({
        price: {
          lte: response.maxPrice,
        },
      });
    }

    if (response.stock && response.stock.length > 0) {
      ORQuery.push({
        stock: {
          in: response.stock,
        },
      });
    }

    if (response.brands && response.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            in: response.brands,
          },
        },
      });
    }

    if (response.categories && response.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: response.categories,
          },
        },
      });
    }

    if (response.locations && response.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            in: response.locations,
          },
        },
      });
    }

    const products = await db.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });

    const res: TProduct[] = products.map((product) => {
      return {
        id: product.id,
        category_name: product.category.name,
        image_url: getImageUrl(product.images[0], "products"),
        name: product.name,
        price: Number(product.price),
      };
    });
    return Response.json(res);
  } catch (error) {
    console.log(error);

    return Response.json({ status: false }, { status: 500 });
  }
}

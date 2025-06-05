import db from "@/lib/db";

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

import db from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany();

    return categories;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}

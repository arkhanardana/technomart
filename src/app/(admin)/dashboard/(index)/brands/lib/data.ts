import db from "@/lib/db";

export const getBrands = async () => {
  try {
    const brands = await db.brand.findMany();
    return brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBrandById = async (id: string) => {
  try {
    const brand = await db.brand.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return brand;
  } catch (error) {
    console.log(error);
    return null;
  }
};

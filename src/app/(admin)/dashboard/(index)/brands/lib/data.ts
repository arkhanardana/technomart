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

import db from "@/lib/db";

export async function getLocations() {
  try {
    const locations = await db.location.findMany();

    return locations;
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function getLocationById(id: string) {
  try {
    const location = await db.location.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    return location;
  } catch (error) {
    console.log(error);
    return null;
  }
}

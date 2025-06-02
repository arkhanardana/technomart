import { Label } from "@/components/ui/label";
import FormProduct from "../_components/form-product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "../../categories/lib/data";
import { getBrands } from "../../brands/lib/data";
import { getLocations } from "../../locations/lib/data";

export default async function CreateProductsPage() {
  const categories = await getCategories();
  const brands = await getBrands();
  const locations = await getLocations();

  return (
    <FormProduct type="ADD">
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Select name="category_id">
          <SelectTrigger id="category" aria-label="Select category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={`${category.id}`}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand_id">
          <SelectTrigger id="brand" aria-label="Select Brand">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location_id">Location</Label>
        <Select name="location_id">
          <SelectTrigger id="location" aria-label="Select location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((location) => (
              <SelectItem key={location.id} value={`${location.id}`}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
}

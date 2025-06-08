import FilterCheckbox from "./filter-checkbox";

export default function FilterStock() {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Stocks</p>

      <FilterCheckbox id={"ready"} value="Ready" type="stock" />
      <FilterCheckbox id={"preorder"} value="Pre-order" type="stock" />
    </div>
  );
}

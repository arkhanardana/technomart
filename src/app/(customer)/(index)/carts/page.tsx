import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";
import CartProducts from "./_components/cart-products";
import CheckOutForm from "./_components/checkout-form";

export default function CartsPage() {
  return (
    <div>
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
        <Navbar />
      </header>
      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Link href={"#"} className="page text-sm text-[#6A7789] last-of-type:text-black">
              Shop
            </Link>
            <span className="text-sm text-[#6A7789]">/</span>
            <Link href={"#"} className="page text-sm text-[#6A7789] last-of-type:text-black">
              Browse
            </Link>
            <span className="text-sm text-[#6A7789]">/</span>
            <Link href={"#"} className="page text-sm text-[#6A7789] last-of-type:text-black">
              Carts
            </Link>
          </div>
          <h1 className="font-bold text-4xl leading-9">My Shopping Cart</h1>
        </div>
      </div>
      <CartProducts />
      <CheckOutForm />
    </div>
  );
}

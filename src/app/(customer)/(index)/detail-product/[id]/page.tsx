import Navbar from "@/components/navbar";
import React, { Suspense } from "react";
import { getProductsDetails } from "../lib/data";
import CarouselImages from "../_components/carousel-images";
import ListProducts from "../../_components/list-products";
import PriceInfo from "../_components/price-info";

export default async function DetailProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductsDetails(Number.parseInt(params.id));

  return (
    <div className="min-h-[1000px]">
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
        <Navbar />
      </header>
      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Shop
            </a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Browse
            </a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Details
            </a>
          </div>
          <h1 className="font-bold text-4xl leading-9">{product?.name}</h1>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center">
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star-gray.svg" alt="star" />
            </div>
          </div>
          <p className="font-semibold">({product?._count.orders})</p>
        </div>
      </div>
      <CarouselImages images={product?.images} />

      <PriceInfo />
      <div
        id="recommedations"
        className="container max-w-[1130px] mx-auto flex flex-col gap-[30px] pb-[100px] mt-[70px]"
      >
        <Suspense fallback={<span>Loading...</span>}>
          <ListProducts
            title={
              <div>
                Other Products <br /> You Might Need
              </div>
            }
            isShowDetail={false}
          />
        </Suspense>
      </div>
    </div>
  );
}

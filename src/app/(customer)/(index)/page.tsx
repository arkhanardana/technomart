import Navbar from "@/components/navbar";
import Image from "next/image";
import React, { Suspense } from "react";
import ListCategory from "./_components/list-category";
import ListProducts from "./_components/list-products";
import ListBrands from "./_components/list-brands";
import Loading from "@/app/(admin)/dashboard/(index)/categories/loading";

export default function CustomerLandingPage() {
  return (
    <section>
      <header className="bg-[#EFF3FA] pt-[30px] pb-[50px]">
        <Navbar />
        <div className="container max-w-[1130px] mx-auto flex items-center justify-between gap-1 mt-[50px]">
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-[10px] p-[8px_16px] rounded-full bg-white w-fit">
              <div className="w-[22px] h-[22px] flex shrink-0">
                <Image src="/assets/icons/crown.svg" alt="icon" width={22} height={22} />
              </div>
              <p className="font-semibold text-sm">Most Popular 100th Product in Technomart</p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <h1 className="font-bold text-[55px] leading-[55px]">Working Faster 10x</h1>
              <p className="text-lg leading-[34px] text-[#6A7789]">
                Dolor si amet lorem super-power features riches than any other platform devices
                AI integrated.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href=""
                className="p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white"
              >
                Add to Cart
              </a>
              <a href="" className="p-[18px_24px] rounded-full font-semibold bg-white">
                View Details
              </a>
            </div>
          </div>
          <div className="w-[588px] h-[360px] flex shrink-0 overflow-hidden relative">
            <Image
              src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
              className="object-contain"
              alt="icon"
              width={588}
              height={360}
            />
            <div className="absolute top-[60%] bg-white p-[14px_16px] rounded-3xl flex items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/code-circle.svg"
                  className="w-6 h-6"
                  alt="icon"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-semibold text-sm">
                Bonus Mac OS <br /> Capitan Pro
              </p>
            </div>
            <div className="absolute right-0 top-[30%] bg-white p-[14px_16px] rounded-3xl flex flex-col items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  src="/assets/icons/star-outline.svg"
                  className="w-6 h-6"
                  alt="icon"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-semibold text-sm text-center">
                Include <br /> Warranty
              </p>
            </div>
          </div>
        </div>
        <div className="container max-w-[1130px] mx-auto flex items-center justify-center gap-10 mt-[50px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p1.png"
                className="w-full h-full object-cover"
                alt="photo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Awesome product!</p>
              <p className="text-xs leading-[18px]">Jemmie Pemilia</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p2.png"
                className="w-full h-full object-cover"
                alt="photo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Money saver 25%</p>
              <p className="text-xs leading-[18px]">Angga Risky</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p3.png"
                className="w-full h-full object-cover"
                alt="photo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">I love the warranty</p>
              <p className="text-xs leading-[18px]">Petina Malaka</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                src="/assets/photos/p4.png"
                className="w-full h-full object-cover"
                alt="photo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">Big deals ever!</p>
              <p className="text-xs leading-[18px]">Udin Sarifun</p>
            </div>
          </div>
        </div>
      </header>
      <section
        id="content"
        className="container max-w-[1130px] mx-auto flex flex-col gap-[50px] pt-[50px] pb-[100px]"
      >
        <Suspense fallback={<Loading />}>
          <ListCategory />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <ListProducts
            title={
              <span>
                Most Picked <br /> Quality Products
              </span>
            }
          />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ListBrands />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ListProducts
            title={
              <span>
                New Releases <br /> From Official Stores
              </span>
            }
          />
        </Suspense>
      </section>
    </section>
  );
}

import Navbar from "@/components/navbar";
import React from "react";

export default function CartsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
        <Navbar />
      </header>
      {children}
    </main>
  );
}

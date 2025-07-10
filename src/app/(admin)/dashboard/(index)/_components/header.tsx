"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  // get current path e.g "/dashboard/products/edit"
  const pathname = usePathname();

  // segments e.g ["dashboard", "products", edit",]
  // not include number
  const segments = pathname
    .split("/")
    .filter((seg) => seg.length > 0 && !/^\d/.test(seg))
    .map((char) => char.charAt(0).toUpperCase() + char.slice(1));

  // build href e.g "/dashboard/products/edit"
  const buildHref = (index: number) => {
    return (
      "/" +
      segments
        .slice(0, index + 1)
        .join("/")
        .toLowerCase()
    );
  };

  return (
    <header className="pt-24 md:pt-0 flex h-14 items-center px-8 md:pl-60">
      <Breadcrumb className="flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === segments.length - 1 ? (
                  <BreadcrumbPage>{decodeURIComponent(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={buildHref(index)}>{decodeURIComponent(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

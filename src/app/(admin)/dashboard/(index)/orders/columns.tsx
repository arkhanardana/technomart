"use client";

import { Badge } from "@/components/ui/badge";
import { rupiahFormat } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  product: TProduct[];
  customer_name: string;
  price: number;
  status: OrderStatus;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const orders = row.original;

      return (
        <div className="flex flex-col gap-4 justify-start">
          {orders.product.map((product, i) => (
            <div
              className="inline-flex items-center gap-5"
              key={`${product.name}-${i}`}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
              />
              <span>{product.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "failed" ? "destructive" : "default"}
      >
        {row.original.status}
      </Badge>
    ),
  },
];

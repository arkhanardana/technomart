"use client";

import { getImageUrl } from "@/lib/supabase";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import { StockProduct } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "./lib/actions";

export type TProduct = {
  id: number;
  name: string;
  image_url: string;
  category_name: string;
  brand_name: string;
  price: number;
  total_sales: number;
  stock: StockProduct;
  createdAt: Date;
};

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(product.image_url, "products")}
            alt={product.name}
            width={80}
            height={80}
          />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;

      return rupiahFormat(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;

      return <Badge variant={"outline"}>{product.stock}</Badge>;
    },
  },
  {
    accessorKey: "total_sales",
    header: "Total Sales",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const product = row.original;

      return dateFormat(product.createdAt);
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href={`/dashboard/products/edit/${product.id}`}>
              <EditIcon className="w-4 h-4" />
              Edit
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this product?
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProduct(product.id)}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

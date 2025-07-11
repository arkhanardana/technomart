"use client";

import { Button } from "@/components/ui/button";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2 } from "lucide-react";
import Link from "next/link";
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
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { deleteBrand } from "./lib/actions";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Products",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image src={getImageUrl(brand.logo)} alt={brand.name} width={80} height={80} />
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
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
                  Are you sure you want to delete this brand?
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the brand.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBrand(brand.id)}>
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

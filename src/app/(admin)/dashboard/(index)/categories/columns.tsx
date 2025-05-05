"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2 } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm">
            <EditIcon className="w-4 h-4" />
            Edit
          </Button>
          <Button size="sm" variant={"destructive"}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      );
    },
  },
];

"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteLocation } from "./lib/actions";
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
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const location = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
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
                  Are you sure you want to delete this location?
                </AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the location.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteLocation(location.id)}>
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { getAllCustomers } from "./lib/data";

export default async function CustomerPage() {
  const customers = await getAllCustomers();

  return (
    <div className="space-y-4 lg:pl-52">
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Manage your customers and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={customers} />
        </CardContent>
      </Card>
    </div>
  );
}

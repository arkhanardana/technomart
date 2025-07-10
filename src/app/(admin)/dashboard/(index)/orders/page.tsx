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
import { getAllOrders } from "./lib/data";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-4 lg:pl-52">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Manage your orders and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} />
        </CardContent>
      </Card>
    </div>
  );
}

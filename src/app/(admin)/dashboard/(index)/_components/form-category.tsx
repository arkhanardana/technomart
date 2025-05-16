"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormCategory() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/categories">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight truncate">
          Category Controller
        </h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Category Form</CardTitle>
            <CardDescription>Please input the category details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" name="name" className="w-full" />
              </div>
              <div className="flex flex-wrap gap-3 pt-4 sm:pt-6">
                <Button variant="outline" type="button">
                  Discard
                </Button>
                <Button type="submit">Save Category</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

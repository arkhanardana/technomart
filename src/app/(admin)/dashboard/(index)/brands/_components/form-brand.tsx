"use client";

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
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { postBrand } from "../lib/actions";
import { ActionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}

export default function FormBrand() {
  const [state, formAction] = useFormState(postBrand, initialState);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/brands">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight truncate">
          Brand Controller
        </h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Brand Form</CardTitle>
            <CardDescription>Please input the brand details</CardDescription>
          </CardHeader>
          <CardContent>
            {state.error !== "" && (
              <div className="pb-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              </div>
            )}

            <form className="space-y-2" action={formAction}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full"
                  // defaultValue={data?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  name="image"
                  className="w-full"
                  // defaultValue={data?.name}
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-4 sm:pt-6">
                <Button variant="outline" type="button">
                  Discard
                </Button>
                <SubmitButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

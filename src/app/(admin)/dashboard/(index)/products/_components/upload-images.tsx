import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function UploadImages() {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Upload your product images.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src="/placeholder.svg"
            width="300"
            // ref={thumbnailRef}
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
                // ref={imageFirstRef}
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
                // ref={imageSecondRef}
              />
            </button>
            <Button
              type="button"
              // onClick={openFolder}
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <Upload className="h-4 w-4 text-white" />
              <span className="sr-only">Upload</span>
            </Button>
            <Input
              // ref={ref}
              // onChange={onChange}
              type="file"
              name="images"
              className="hidden"
              accept="images/*"
              multiple
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

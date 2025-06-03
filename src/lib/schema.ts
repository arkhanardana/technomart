import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const schemaSignIn = z.object({
  email: z.string({ required_error: "Email is required" }).trim().email({
    message: "Please input a valid email",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(5, { message: "Password should have min 5 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .trim()
    .min(4, { message: "Category name should have min 4 characters" }),
});

export const schemaLocation = z.object({
  name: z
    .string({ required_error: "Location name is required" })
    .trim()
    .min(4, { message: "Location name should have min 4 characters" }),
});

export const schemaBrand = z.object({
  name: z
    .string({ required_error: "Brand name is required" })
    .trim()
    .min(4, { message: "Brand name should have min 4 characters" }),
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg and .png formats are allowed",
    })
    .refine((file: File) => file?.name, {
      message: "Image is required",
    }),
});

export const schemaUpdateBrand = z.object({
  name: z.string({ required_error: "Brand name is required" }).trim().min(4, {
    message: "Brand name should have min 4 characters",
  }),
  image: z
    .union([
      z.undefined(),
      z.any().refine((file: File) => file.size === 0, {
        message: "Only .jpg, .jpeg and .png formats are allowed",
      }),
      z.any().refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg and .png formats are allowed",
      }),
    ])
    .optional(),
});

export const schemaProduct = z.object({
  name: z
    .string({ required_error: "Products name is required" })
    .trim()
    .min(4, { message: "Products name should have min 4 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(10, { message: "Description should have min 10 characters" }),
  price: z.string({ required_error: "Price is required" }),
  stock: z.string({ required_error: "Stock is required" }),
  category_id: z.string({ required_error: "Category is required" }),
  brand_id: z.string({ required_error: "Brand is required" }),
  location_id: z.string({ required_error: "Location is required" }),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 image product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: "Uploaded file should image",
      }
    ),
});

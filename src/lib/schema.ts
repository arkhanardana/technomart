import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const schemaSignIn = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Please input a valid email",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password should have min 5 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .min(4, { message: "Category name should have min 4 characters" }),
});

export const schemaLocation = z.object({
  name: z
    .string({ required_error: "Location name is required" })
    .min(4, { message: "Location name should have min 4 characters" }),
});

export const schemaBrand = z.object({
  name: z
    .string({ required_error: "Brand name is required" })
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
  name: z.string({ required_error: "Brand name is required" }).min(4, {
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

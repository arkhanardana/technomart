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

export const schemaSignUp = schemaSignIn.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(5, { message: "Name should have min 5 characters" }),
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

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({ required_error: "Id is required" }),
  })
  .omit({ images: true });

export const schemaShippingAddress = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(5, { message: "Name should have 5 minimal characters" }),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, { message: "Address should have 5 minimal characters" }),
  city: z
    .string({ required_error: "City is required" })
    .min(5, { message: "City should have 5 minimal characters" }),
  postal_code: z
    .string({ required_error: "Postal Code is required" })
    .min(5, { message: "Postal Code should have 5 minimal characters" }),
  notes: z.string().nullable(),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(5, { message: "Phone should have 5 minimal characters" }),
});

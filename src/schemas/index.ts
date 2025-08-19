import { z } from "zod";

// Regex
const numberRegex = /^\d+$/;

//Schemas de Forms
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z
  .object({
    first_name: z.string({ message: "Is required" }),
    last_name: z.string({ message: "Is required" }),
    dni: z
      .string({ message: "DNI is required" })
      .min(7, { message: "DNI must be at least 7 characters" })
      .max(8, { message: "DNI must be at most 8 characters" })
      .regex(numberRegex, { message: "DNI must contain only numbers" }),
    number_phone: z.object({
      areaCode: z
        .string()
        .min(2, { message: "Code must be at least 2 digits" })
        .max(4, { message: "Code can't exceed 4 digits" })
        .regex(numberRegex, "Code must contain only numbers"),
      number: z
        .string()
        .min(6, { message: "Number must be at least 6 digits" })
        .max(10, { message: "Number can't exceed 10 digits" })
        .regex(numberRegex, "Phone number must contain only numbers"),
    }),
    email: z.string().email({ message: "Email is invalid" }),
    confirmEmail: z.string(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

export const profileSchema = z.object({
  first_name: z.string({ message: "Is required" }),
  last_name: z.string({ message: "Is required" }),
  dni: z
    .string({ message: "DNI is required" })
    .min(7, { message: "DNI must be at least 7 characters" })
    .max(8, { message: "DNI must be at most 8 characters" })
    .regex(numberRegex, { message: "DNI must contain only numbers" }),
  number_phone: z
    .string()
    .min(8, { message: "Code must be at least 8 digits" })
    .max(14, { message: "Code can't exceed 14 digits" })
    .regex(numberRegex, "Code must contain only numbers"),
  email: z.string().email({ message: "Email is invalid" }),
  avatar: z.string().optional(),
});

export const seguritySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const productSchema = z.object({
  name: z.string({ message: "Name is required" }),
  genre: z.enum(["hombre", "mujer", "kids"], {
    message: "Category is required",
  }),
  price: z
    .string({ message: "Price is required" })
    .regex(numberRegex, { message: "Price must contain only numbers" }),
  discount: z
    .string({ message: "Discount is required" })
    .regex(numberRegex, { message: "Discount must contain only numbers" }),
  stock: z
    .string({ message: "Stock is required" })
    .regex(numberRegex, { message: "Stock must contain only numbers" }),
  imageUrl: z.string().optional(),
  brand: z.object({
    name: z.string({ message: "Brand name is required" }),
    image: z.string().url({ message: "Invalid URL for brand" }),
  }),
  description: z.string({ message: "Description is required" }),
  sku: z.string({ message: "SKU is required" }),
  size: z.string().optional(),
});

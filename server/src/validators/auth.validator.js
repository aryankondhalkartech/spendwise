import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.email("Please enter a valid email address").trim().toLowerCase(),

  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters"),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address").trim().toLowerCase(),

  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters"),
});

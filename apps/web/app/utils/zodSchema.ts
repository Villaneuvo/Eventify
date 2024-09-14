import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid format email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, { message: "Password must be at least 8 characters long" }),
});

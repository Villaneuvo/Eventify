import { z } from "zod";

export const createMerchandiseSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().nonnegative("Price must be a non-negative number"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    eventId: z.string().uuid("Invalid UUID format"),
});

export const updateMerchandiseSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    price: z.number().nonnegative("Price must be a non-negative number").optional(),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer").optional(),
});

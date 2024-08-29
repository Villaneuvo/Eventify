import { z } from "zod";

export const createPromotionSchema = z.object({
    code: z.string().min(1, "Code is required"),
    discount: z.number().nonnegative("Discount must be a non-negative number"),
    validFrom: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
    validUntil: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
    eventId: z.string().uuid("Invalid UUID format"),
});

export const updatePromotionSchema = z.object({
    discount: z.number().nonnegative("Discount must be a non-negative number").optional(),
    validFrom: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
        .optional(),
    validUntil: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
        .optional(),
});

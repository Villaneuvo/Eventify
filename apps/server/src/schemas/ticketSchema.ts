import { z } from "zod";

export const createTicketSchema = z.object({
    type: z.enum(["GENERAL_ADMISSION", "VIP", "EARLY_BIRD"]),
    price: z.number().nonnegative("Price must be a non-negative number"),
    eventId: z.string().uuid("Invalid UUID format"),
    userId: z.string().uuid("Invalid UUID format"),
});

export const updateTicketSchema = z.object({
    type: z.enum(["GENERAL_ADMISSION", "VIP", "EARLY_BIRD"]).optional(),
    price: z.number().nonnegative("Price must be a non-negative number").optional(),
    redeemed: z.boolean().optional(),
});

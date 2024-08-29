import { z } from "zod";

export const createTransactionSchema = z.object({
    amount: z.number().nonnegative("Amount must be a non-negative number"),
    userId: z.string().uuid("Invalid UUID format"),
    ticketId: z.string().uuid("Invalid UUID format").optional(),
    merchandiseId: z.string().uuid("Invalid UUID format").optional(),
    promotionId: z.string().uuid("Invalid UUID format").optional(),
});

export const updateTransactionSchema = z.object({
    amount: z.number().nonnegative("Amount must be a non-negative number").optional(),
});

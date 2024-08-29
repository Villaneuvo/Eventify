import { z } from "zod";

export const createReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
    userId: z.string().uuid("Invalid UUID format"),
    eventId: z.string().uuid("Invalid UUID format"),
});

export const updateReviewSchema = z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
});

import { z } from "zod";

const promotionSchema = z.object({
    id: z.string().optional(), // Optional for updates
    code: z.string(),
    discount: z.number().min(0).max(1), // Discount as a percentage (0-1)
    validFrom: z.date(),
    validUntil: z.date(),
    usageCount: z.number().default(0),
});

export const createEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    genre: z.enum(["ELECTRONIC", "INDIE", "JAZZ", "ROCK", "POP", "HIPHOP"]),
    date: z.string(),
    location: z.string(),
    price: z.number().min(0),
    organizerId: z.string(),
    promotions: z.array(promotionSchema).optional(), // Add promotions as optional
});

export const updateEventSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    genre: z.enum(["ELECTRONIC", "INDIE", "JAZZ", "ROCK", "POP", "HIPHOP"]).optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    price: z.number().min(0).optional(),
    organizerId: z.string().optional(),
    promotions: z.array(promotionSchema).optional(), // Add promotions as optional
});

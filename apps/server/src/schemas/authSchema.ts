import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8), // Ensure a strong password
    referralCode: z.string().optional(), // Referral code is optional
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8), // Ensure a strong password
});

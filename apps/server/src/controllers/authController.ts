import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const parsedData = registerSchema.parse(req.body);
        const { name, email, password, referralCode } = parsedData;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newReferralCode = generateRandomString();

        let pointsEarned = 0;
        let pointsExpiry: Date | null = null;

        if (referralCode) {
            const referredBy = await prisma.user.findUnique({
                where: { referralCode },
            });

            if (referredBy) {
                pointsEarned = 10000;
                pointsExpiry = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months validity

                await prisma.user.update({
                    where: { id: referredBy.id },
                    data: {
                        pointsEarned: {
                            increment: pointsEarned,
                        },
                        pointsExpiry: pointsExpiry,
                    },
                });
            } else {
                return res.status(400).json({ message: "Referral code not found" });
            }
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                referralCode: newReferralCode,
                pointsEarned,
                pointsExpiry,
            },
        });

        if (referralCode) {
            const promotionCode = generateRandomString(12);
            const validUntil = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months validity

            await prisma.promotion.create({
                data: {
                    code: promotionCode,
                    discount: 0.1,
                    validFrom: new Date(),
                    validUntil,
                    isEventSpecific: false,
                    user: {
                        connect: { id: user.id },
                    },
                },
            });
        }

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                referralCode: user.referralCode,
            },
        });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const parsedData = loginSchema.parse(req.body);
        const { email, password } = parsedData;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const uuidAuth = uuidv4();

        const existingAuthUser = await prisma.authUser.findFirst({
            where: { userId: user.id },
        });

        if (existingAuthUser) {
            await prisma.authUser.update({
                where: { id: existingAuthUser.id },
                data: { authUUID: uuidAuth },
            });
        } else {
            await prisma.authUser.create({
                data: {
                    userId: user.id,
                    authUUID: uuidAuth,
                },
            });
        }

        const token = generateToken(user, uuidAuth);

        res.json({ message: "Login successful", token });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

const generateToken = (user: any, uuidAuth: string) => {
    return jwt.sign(
        {
            authID: uuidAuth,
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
};

const generateRandomString = (length: number = 8): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

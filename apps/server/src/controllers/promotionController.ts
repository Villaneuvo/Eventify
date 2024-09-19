import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { createPromotionSchema, updatePromotionSchema } from "../schemas/promotionSchema";

const prisma = new PrismaClient();

export const getAllPromotions = async (req: Request, res: Response) => {
    try {
        const promotions = await prisma.promotion.findMany();
        res.json(promotions);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve promotions", error });
    }
};

export const getPromotionByCode = async (req: Request, res: Response) => {
    const { code } = req.params;
    try {
        const promotion = await prisma.promotion.findUnique({ where: { code } });
        if (!promotion) return res.status(404).json({ message: "Promotion not found" });
        res.json(promotion);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve promotion", error });
    }
};

export const createPromotion = async (req: Request, res: Response) => {
    try {
        const parsedData = createPromotionSchema.parse(req.body);
        const newPromotion = await prisma.promotion.create({
            data: {
                ...parsedData,
                eventId: req.body.eventId,
            },
        });
        res.status(201).json(newPromotion);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const parsedData = updatePromotionSchema.parse(req.body);
        const { id } = req.params;
        const updatedPromotion = await prisma.promotion.update({
            where: { id },
            data: parsedData,
        });
        res.json(updatedPromotion);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const deletePromotion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const promotion = await prisma.promotion.findUnique({ where: { id } });
        if (!promotion) return res.status(404).json({ message: "Promotion not found" });

        await prisma.promotion.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete promotion", error });
    }
};

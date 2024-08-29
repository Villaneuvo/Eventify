import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { createMerchandiseSchema, updateMerchandiseSchema } from "../schemas/merchandiseSchema";

const prisma = new PrismaClient();

export const getAllMerchandises = async (req: Request, res: Response) => {
    const { search, page = 1, pageSize = 10 } = req.query;

    const whereClause: any = {};

    if (search) {
        whereClause.OR = [{ name: { contains: search as string } }, { description: { contains: search as string } }];
    }

    try {
        const merchandises = await prisma.merchandise.findMany({
            where: whereClause,
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
        });

        const totalMerchandises = await prisma.merchandise.count({ where: whereClause });

        res.json({
            data: merchandises,
            pagination: {
                total: totalMerchandises,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(totalMerchandises / Number(pageSize)),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve merchandises", error });
    }
};

export const getMerchandiseById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const merchandise = await prisma.merchandise.findUnique({ where: { id } });
        if (!merchandise) return res.status(404).json({ message: "Merchandise not found" });
        res.json(merchandise);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve merchandise", error });
    }
};

export const createMerchandise = async (req: Request, res: Response) => {
    try {
        const parsedData = createMerchandiseSchema.parse(req.body);
        const newMerchandise = await prisma.merchandise.create({
            data: parsedData,
        });
        res.status(201).json(newMerchandise);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const updateMerchandise = async (req: Request, res: Response) => {
    try {
        const parsedData = updateMerchandiseSchema.parse(req.body);
        const { id } = req.params;

        const merchandise = await prisma.merchandise.findUnique({ where: { id } });
        if (!merchandise) return res.status(404).json({ message: "Merchandise not found" });

        const updatedMerchandise = await prisma.merchandise.update({
            where: { id },
            data: parsedData,
        });
        res.json(updatedMerchandise);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const deleteMerchandise = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const merchandise = await prisma.merchandise.findUnique({ where: { id } });
        if (!merchandise) return res.status(404).json({ message: "Merchandise not found" });

        await prisma.merchandise.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete merchandise", error });
    }
};

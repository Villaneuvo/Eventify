import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { createReviewSchema, updateReviewSchema } from "../schemas/reviewSchema";

const prisma = new PrismaClient();

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await prisma.review.findMany();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve reviews", error });
    }
};

export const getReviewById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve review", error });
    }
};

export const createReview = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(400).json({ message: "User ID is required to create a review" });
        }

        const parsedData = createReviewSchema.parse(req.body);
        const newReview = await prisma.review.create({
            data: {
                ...parsedData,
                userId: req.user?.id,
            },
        });
        res.status(201).json(newReview);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const updateReview = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsedData = updateReviewSchema.parse(req.body);
        const { id } = req.params;

        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        const updatedReview = await prisma.review.update({
            where: { id },
            data: parsedData,
        });
        res.json(updatedReview);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) return res.status(404).json({ message: "Review not found" });

        if (review.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        await prisma.review.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete review", error });
    }
};

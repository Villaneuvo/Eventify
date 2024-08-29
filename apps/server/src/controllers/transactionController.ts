import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transactionSchema";

const prisma = new PrismaClient();

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.json(transactions);
    } catch (error) {
        console.error("Error retrieving transactions:", error);
        res.status(500).json({ message: "Failed to retrieve transactions", error });
    }
};

export const getTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        res.json(transaction);
    } catch (error) {
        console.error("Error retrieving transaction:", error);
        res.status(500).json({ message: "Failed to retrieve transaction", error });
    }
};

export const createTransaction = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(400).json({ message: "User ID is required to create a transaction" });
        }

        const parsedData = createTransactionSchema.parse(req.body);
        const newTransaction = await prisma.transaction.create({
            data: {
                ...parsedData,
                userId: req.user?.id,
            },
        });
        res.status(201).json(newTransaction);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            console.error("Error creating transaction:", e);
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const updateTransaction = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsedData = updateTransactionSchema.parse(req.body);
        const { id } = req.params;

        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        if (transaction.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this transaction" });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: parsedData,
        });
        res.json(updatedTransaction);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            console.error("Error updating transaction:", e);
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const deleteTransaction = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        if (transaction.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this transaction" });
        }

        await prisma.transaction.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Failed to delete transaction", error });
    }
};

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllReferrals = async (req: Request, res: Response) => {
    try {
        const referrals = await prisma.referral.findMany();
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve referrals", error });
    }
};

export const getReferralById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const referral = await prisma.referral.findUnique({ where: { id } });
        if (!referral) return res.status(404).json({ message: "Referral not found" });
        res.json(referral);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve referral", error });
    }
};

export const deleteReferral = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const referral = await prisma.referral.findUnique({ where: { id } });
        if (!referral) return res.status(404).json({ message: "Referral not found" });

        await prisma.referral.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete referral", error });
    }
};

import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });

    res.json(usersWithoutPassword);
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (req.user?.id !== id) {
        return res.status(403).json({ message: "You are not authorized to view this profile" });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsedData = updateUserSchema.parse(req.body);
        const { id } = req.params;

        if (req.user?.id !== id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to update this profile" });
        }

        let updateData = parsedData;
        if (req.user?.role !== Role.ADMIN) {
            const { role, ...rest } = parsedData;
            updateData = rest;
        }

        if (parsedData.password) {
            const hashedPassword = await bcrypt.hash(parsedData.password, 10);
            updateData.password = hashedPassword;
        }

        await prisma.user.update({
            where: { id },
            data: updateData,
        });
        res.json("User updated successfully");
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        if (req.user?.id !== id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this profile" });
        }

        await prisma.user.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user", error });
    }
};

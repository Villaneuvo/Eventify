import { PrismaClient, Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface AuthenticatedUser {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser;
        if (!verifiedUser) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const dataUser = jwt.decode(token) as { id: string; authID: string };
        const authUser = await prisma.authUser.findFirst({
            where: {
                userId: dataUser.id,
            },
        });

        if (!authUser || authUser.authUUID !== dataUser.authID) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = verifiedUser;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const roleMiddleware = (roles: Role[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
        next();
    };
};

export const adminGuard = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== Role.ADMIN) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    next();
};

export const updateMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (req.user?.id !== id) {
        return res.status(403).json({ message: "You can only update your own profile" });
    }
    next();
};

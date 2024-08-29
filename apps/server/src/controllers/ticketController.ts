import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { createTicketSchema, updateTicketSchema } from "../schemas/ticketSchema";

const prisma = new PrismaClient();

export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await prisma.ticket.findMany();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve tickets", error });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve ticket", error });
    }
};

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(400).json({ message: "User ID is required to create a ticket" });
        }

        const parsedData = createTicketSchema.parse(req.body);
        const newTicket = await prisma.ticket.create({
            data: {
                ...parsedData,
                userId: req.user?.id,
            },
        });
        res.status(201).json(newTicket);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const updateTicket = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsedData = updateTicketSchema.parse(req.body);
        const { id } = req.params;

        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this ticket" });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: parsedData,
        });
        res.json(updatedTicket);
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const deleteTicket = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        if (ticket.userId !== req.user?.id && req.user?.role !== Role.ADMIN) {
            return res.status(403).json({ message: "You are not authorized to delete this ticket" });
        }

        await prisma.ticket.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete ticket", error });
    }
};

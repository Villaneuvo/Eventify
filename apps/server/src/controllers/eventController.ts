import { Genre, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { createEventSchema, updateEventSchema } from "../schemas/eventSchema";

const prisma = new PrismaClient();

export const getAllEvents = async (req: Request, res: Response) => {
    const { search, category, location, page = 1, pageSize = 10 } = req.query;

    const whereClause: any = {};

    if (search) {
        whereClause.OR = [{ name: { contains: search as string } }, { description: { contains: search as string } }];
    }

    if (category) {
        whereClause.genre = category as Genre;
    }

    if (location) {
        whereClause.location = { contains: location as string };
    }

    try {
        const events = await prisma.event.findMany({
            where: whereClause,
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            include: {
                organizer: true,
                tickets: true,
                reviews: true,
            },
        });

        const totalEvents = await prisma.event.count({ where: whereClause });

        res.json({
            data: events,
            pagination: {
                total: totalEvents,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(totalEvents / Number(pageSize)),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};

export const getAllEventsOrganizer = async (req: AuthenticatedRequest, res: Response) => {
    const { search, category, location, page = 1, pageSize = 10 } = req.query;

    const whereClause: any = {};

    const organizerId = req.user?.id;

    if (organizerId) {
        whereClause.organizerId = organizerId;
    }

    if (search) {
        whereClause.OR = [{ name: { contains: search as string } }, { description: { contains: search as string } }];
    }

    if (category) {
        whereClause.genre = category as Genre;
    }

    if (location) {
        whereClause.location = { contains: location as string };
    }

    try {
        const events = await prisma.event.findMany({
            where: whereClause,
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            include: {
                organizer: true,
                tickets: true,
                reviews: true,
            },
        });

        const totalEvents = await prisma.event.count({ where: whereClause });

        res.json({
            data: events,
            pagination: {
                total: totalEvents,
                page: Number(page),
                pageSize: Number(pageSize),
                totalPages: Math.ceil(totalEvents / Number(pageSize)),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve events", error });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                organizer: true,
                tickets: true,
                reviews: true,
            },
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve event", error });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const parsedData = createEventSchema.parse(req.body);

        await prisma.$transaction(async (prisma) => {
            const newEvent = await prisma.event.create({
                data: {
                    name: parsedData.name,
                    description: parsedData.description,
                    genre: parsedData.genre,
                    date: parsedData.date,
                    location: parsedData.location,
                    price: parsedData.price,
                    organizerId: parsedData.organizerId,
                    promotions: parsedData.promotions
                        ? {
                              create: parsedData.promotions,
                          }
                        : undefined,
                },
            });

            res.status(201).json(newEvent);
        });
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const parsedData = updateEventSchema.parse(req.body);
        const { id } = req.params;

        const existingEvent = await prisma.event.findUnique({ where: { id } });

        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (existingEvent.organizerId !== req.user?.id) {
            return res.status(403).json({ message: "You are not authorized to update this event" });
        }

        await prisma.$transaction(async (prisma) => {
            const updatedEvent = await prisma.event.update({
                where: { id },
                data: {
                    name: parsedData.name,
                    description: parsedData.description,
                    genre: parsedData.genre,
                    date: parsedData.date,
                    location: parsedData.location,
                    price: parsedData.price,
                    promotions: parsedData.promotions
                        ? {
                              upsert: parsedData.promotions.map((promo) => ({
                                  where: { id: promo.id || undefined },
                                  update: promo,
                                  create: promo,
                              })),
                          }
                        : undefined,
                },
            });

            res.json(updatedEvent);
        });
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).json({ errors: e.errors });
        } else {
            res.status(500).json({ message: "Internal server error", error: e });
        }
    }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
        const delEvent = await prisma.event.findUnique({ where: { id } });
        if (!delEvent) return res.status(404).json({ message: "Event not found" });

        if (delEvent.organizerId !== req.user?.id) {
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        }

        await prisma.event.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete event", error });
    }
};

export const buyTicket = async (req: Request, res: Response) => {
    const { eventId, userId, ticketType, usePoints = false } = req.body;

    try {
        const event = await prisma.event.findUnique({ where: { id: eventId } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        let finalPrice = event.price;
        let pointsUsed = 0;

        if (usePoints) {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (user && user.pointsEarned > 0) {
                const availablePoints = Math.min(user.pointsEarned - user.pointsRedeemed, finalPrice);
                pointsUsed = Math.max(0, availablePoints);
                finalPrice -= pointsUsed;
            }
        }

        await prisma.$transaction(async (prisma) => {
            const ticket = await prisma.ticket.create({
                data: {
                    type: ticketType,
                    price: finalPrice,
                    eventId: event.id,
                    userId: userId,
                },
            });

            if (pointsUsed > 0) {
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        pointsRedeemed: {
                            increment: pointsUsed,
                        },
                    },
                });
            }

            await prisma.transaction.create({
                data: {
                    amount: finalPrice,
                    userId: userId,
                    ticketId: ticket.id,
                },
            });

            res.status(201).json({ message: "Ticket purchased successfully", ticket });
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to purchase ticket", error });
    }
};

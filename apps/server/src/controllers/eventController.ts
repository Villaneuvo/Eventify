import { Genre, PrismaClient, TicketType } from "@prisma/client";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { buyTicketSchema, createEventSchema, updateEventSchema } from "../schemas/eventSchema";

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
                    availableTicket: parsedData.availableTicket,
                    mainImage: parsedData.mainImage,
                    organizerId: parsedData.organizerId,
                    ...(parsedData.promotions && {
                        promotions: {
                            create: parsedData.promotions.map((promo) => ({
                                discount: promo.discount,
                                validFrom: promo.validFrom,
                                validUntil: promo.validUntil,
                                code: promo.code ?? generateRandomString(12), // Ensure the code is always provided if needed
                            })),
                        },
                    }),
                },
            });

            if (parsedData.createReferralDiscount) {
                await createPromotionsForReferrals(parsedData.organizerId, newEvent.id);
            }

            if (parsedData.createDateBasedDiscount) {
                await createDateBasedPromotions(newEvent.date, parsedData.organizerId, newEvent.id);
            }

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
                    availableTicket: parsedData.availableTicket,
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
    try {
        const parsedData = buyTicketSchema.parse(req.body);
        const { eventId, userId, ticketType, quantity = 1, usePoints = false } = parsedData;

        const event = await prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.availableTicket < quantity) {
            return res.status(400).json({ message: `Only ${event.availableTicket} tickets are available` });
        }

        let finalPrice = event.price * quantity;
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
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    availableTicket: {
                        decrement: quantity,
                    },
                },
            });

            for (let i = 0; i < quantity; i++) {
                await prisma.ticket.create({
                    data: {
                        type: ticketType as TicketType,
                        price: event.price,
                        eventId: event.id,
                        userId: userId,
                    },
                });
            }

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
                },
            });

            res.status(201).json({ message: "Tickets purchased successfully", tickets: quantity });
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: "Failed to purchase tickets", error });
    }
};

const createPromotionsForReferrals = async (organizerId: string, eventId: string) => {
    const referredUsers = await prisma.user.findMany({
        where: { usedReferralCode: { not: null } },
    });

    for (const referredUser of referredUsers) {
        const promotionCode = generateRandomString(12);

        await prisma.promotion.create({
            data: {
                code: promotionCode,
                discount: 15.0,
                validFrom: new Date(),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 1 month
                isEventSpecific: true,
                event: { connect: { id: eventId } },
                user: { connect: { id: referredUser.id } },
            },
        });
    }
};

const createDateBasedPromotions = async (eventDate: Date, organizerId: string, eventId: string) => {
    const promotionCode = generateRandomString(12);

    const currentDate = new Date();
    const daysUntilEvent = (eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    let discount = 0;
    if (daysUntilEvent > 30) {
        discount = 10; // 10% discount for bookings more than 30 days before the event
    } else if (daysUntilEvent > 7) {
        discount = 5; // 5% discount for bookings between 7 and 30 days before the event
    }

    if (discount > 0) {
        await prisma.promotion.create({
            data: {
                code: promotionCode,
                discount,
                validFrom: new Date(),
                validUntil: eventDate,
                isEventSpecific: true,
                event: { connect: { id: eventId } },
                user: { connect: { id: organizerId } },
            },
        });
    }
};

const generateRandomString = (length: number = 12): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

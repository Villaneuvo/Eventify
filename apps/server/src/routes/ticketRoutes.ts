import { Role } from "@prisma/client";
import { Router } from "express";
import { createTicket, deleteTicket, getAllTickets, getTicketById, updateTicket } from "../controllers/ticketController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";
import { buyTicket } from "../controllers/eventController";

const router = Router();

router.get("/", authMiddleware, getAllTickets);
router.get("/:id", authMiddleware, getTicketById);
router.post("/buy", authMiddleware, buyTicket);
router.post("/", authMiddleware, roleMiddleware([Role.ADMIN, Role.ORGANIZER]), createTicket);
router.put("/:id", authMiddleware, roleMiddleware([Role.ADMIN, Role.ORGANIZER]), updateTicket);
router.delete("/:id", authMiddleware, roleMiddleware([Role.ADMIN, Role.ORGANIZER]), deleteTicket);

export default router;

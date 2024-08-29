import { Role } from "@prisma/client";
import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getAllEventsOrganizer, getEventById, updateEvent } from "../controllers/eventController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllEvents);
router.get("/organizer", authMiddleware, roleMiddleware([Role.ORGANIZER]), getAllEventsOrganizer);
router.get("/:id", authMiddleware, getEventById);
router.post("/", authMiddleware, roleMiddleware([Role.ORGANIZER]), createEvent);
router.put("/:id", authMiddleware, roleMiddleware([Role.ORGANIZER]), updateEvent);
router.delete("/:id", authMiddleware, roleMiddleware([Role.ORGANIZER]), deleteEvent);

export default router;

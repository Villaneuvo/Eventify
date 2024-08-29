import { Role } from "@prisma/client";
import { Router } from "express";
import { createPromotion, deletePromotion, getAllPromotions, getPromotionById, updatePromotion } from "../controllers/promotionController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllPromotions);
router.get("/:id", authMiddleware, getPromotionById);
router.post("/", authMiddleware, roleMiddleware([Role.ORGANIZER]), createPromotion);
router.put("/:id", authMiddleware, roleMiddleware([Role.ORGANIZER]), updatePromotion);
router.delete("/:id", authMiddleware, roleMiddleware([Role.ORGANIZER]), deletePromotion);

export default router;

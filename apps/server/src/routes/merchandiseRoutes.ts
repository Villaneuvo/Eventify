import { Router } from "express";
import { createMerchandise, deleteMerchandise, getAllMerchandises, getMerchandiseById, updateMerchandise } from "../controllers/merchandiseController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllMerchandises);
router.get("/:id", authMiddleware, getMerchandiseById);
router.post("/", authMiddleware, createMerchandise);
router.put("/:id", authMiddleware, updateMerchandise);
router.delete("/:id", authMiddleware, deleteMerchandise);

export default router;

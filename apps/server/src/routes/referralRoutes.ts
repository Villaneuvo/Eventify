import { Router } from "express";
import { deleteReferral, getAllReferrals, getReferralById } from "../controllers/referralController";
import { adminGuard, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, adminGuard, getAllReferrals);
router.get("/:id", authMiddleware, adminGuard, getReferralById);
router.delete("/:id", authMiddleware, adminGuard, deleteReferral);

export default router;

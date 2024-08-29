import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { adminGuard, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, adminGuard, getAllUsers);
router.get("/:id", authMiddleware, adminGuard, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminGuard, deleteUser);

export default router;

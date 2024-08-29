import { Router } from "express";
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from "../controllers/transactionController";
import { adminGuard, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.post("/", authMiddleware, adminGuard, createTransaction);
router.put("/:id", authMiddleware, adminGuard, updateTransaction);
router.delete("/:id", authMiddleware, adminGuard, deleteTransaction);

export default router;

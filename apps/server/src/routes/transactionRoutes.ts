import { Router } from "express";
import { createTransaction, deleteTransaction, getAllTransactionByUser, getAllTransactions, getTransactionById, getTransactionByUser, updateTransaction } from "../controllers/transactionController";
import { adminGuard, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, adminGuard, getAllTransactions);
router.get("/:id", authMiddleware, adminGuard, getTransactionById);
router.get("/users/:id", authMiddleware, getAllTransactionByUser);
router.get("/users/:id/:transactionId", authMiddleware, getTransactionByUser);
router.post("/", authMiddleware, adminGuard, createTransaction);
router.put("/:id", authMiddleware, adminGuard, updateTransaction);
router.delete("/:id", authMiddleware, adminGuard, deleteTransaction);

export default router;

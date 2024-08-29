import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import merchandiseRoutes from "./routes/merchandiseRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import referralRoutes from "./routes/referralRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/ticket", ticketRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/referral", referralRoutes);
app.use("/api/v1/promotion", promotionRoutes);
app.use("/api/v1/merchandise", merchandiseRoutes);
app.use("/api/v1/transaction", transactionRoutes);

app.use(errorMiddleware);

export default app;

import connectDB from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./src/routes/user.Routes.js";
import productRoutes from "./src/routes/product.Routes.js";
import categoryRouter from "./src/routes/categories.Routes.js";
import authRoutes from "./src/routes/auth.Routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { notFound } from "./src/middleware/notFound.Middleware.js"
import { globalErrorHandler } from "./src/middleware/errorHandler.Middleware.js"
import { globalRateLimit } from "./src/middleware/rateLimit.Middleware.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//MIDDLEWARE 
app.use(globalRateLimit)
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// API routes
app.use("/api", userRoutes);
app.use("/api", productRoutes); //test done
app.use("/api", categoryRouter); //test done
app.use("/api", authRoutes)

//error handlng middleware
app.use(notFound)
app.use(globalErrorHandler) //MUST be the last one

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

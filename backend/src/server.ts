import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limiter } from "./middleware/rateLimiter.js";
import { createHttpError } from "./utils/createHttpError.js";
import { centralizedError } from "./middleware/centralizedError.js";
import apiRoutes from "./api/routes.js";
import { AppDataSource } from "./data-source.js";

// Load environment variable from .env file
dotenv.config();

const app = express();

// Trust first proxy if behind a proxy
app.set("trust proxy", 1);

// Seurity middleare
app.use(helmet());

// CORS configuration
const corsObption = {
  oigin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
      ],
  credentials: true, // ✅ allow cookies to be sent
};
app.use(cors(corsObption));

// Apply rate limiting middleware to all requests
app.use(limiter);

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api", apiRoutes);

// Error 404 Handler Middleware
app.use((req, res, next) => {
  next(createHttpError(404, "Not found..."));
});

// Centralized Error Handling Middleware
app.use(centralizedError);

const port = process.env.PORT || 8055;
// Connect to MongoDB and start the server

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully! 🐘");

    app.listen(port, () => {
      console.log(`Server running on port ${port} ✅`);
    });
  } catch (err) {
    console.error("‼️ Startup error:", err);
    process.exit(1);
  }
})();

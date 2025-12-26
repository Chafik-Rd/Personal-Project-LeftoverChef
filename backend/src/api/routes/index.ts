import express, { Router } from "express";
import userRoutes from "./auth.routes.js";
import ingredientRoutes from "./ingredient.routes.js";

const router: Router = express.Router();
router.use("/", userRoutes);
router.use("/ingredient", ingredientRoutes);
export default router;

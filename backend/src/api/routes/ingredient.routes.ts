import express, { Router } from "express";
import {
  createIngredient,
  deleteIngredient,
  getAllIngredient,
  updateIngredient,
} from "../controllers/ingredient.controller.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
  createIngredientSchema,
  paramsIngredientSchema,
  updateIngredientSchema,
} from "../validators/ingredient.schema.js";
import { getQuerySchema } from "../validators/share.schema.js";

const router: Router = express.Router();

router.post(
  "/",
  validateData(createIngredientSchema, "body"),
  createIngredient
);
router.get("/", validateData(getQuerySchema, "query"), getAllIngredient);
router.patch(
  "/:ingredientId",
  validateData(paramsIngredientSchema, "params"),
  validateData(updateIngredientSchema, "body"),
  updateIngredient
);
router.delete(
  "/:ingredientId",
  validateData(paramsIngredientSchema, "params"),
  deleteIngredient
);

export default router;

import express, { Router } from "express";
import multer from "multer";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { getQuerySchema } from "../validators/share.schema.js";
import { paramsRecipeSchema } from "../validators/recipe.schema.js";

const upload = multer();
const router: Router = express.Router();

router.post("/", upload.single("image"), createRecipe);
router.get("/", validateData(getQuerySchema, "query"), getAllRecipe);
router.get(
  "/:recipeId",
  validateData(paramsRecipeSchema, "params"),
  getRecipeById
);
router.patch(
  "/:recipeId",
  validateData(paramsRecipeSchema, "params"),
  upload.single("image"),
  updateRecipe
);
router.delete(
  "/:recipeId",
  validateData(paramsRecipeSchema, "params"),
  deleteRecipe
);
export default router;

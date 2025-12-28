import type { NextFunction, Request, Response } from "express";
import { RecipeService } from "../services/recipe.service.js";
import { createHttpError } from "../../utils/createHttpError.js";
import {
  createRecipeSchema,
  updateRecipeSchema,
} from "../validators/recipe.schema.js";

const recipeService = new RecipeService();

// Create recipe
export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) throw createHttpError(400, "Please upload a recipe image");
    const body = { ...req.body };

    // Change ingredients from string to array
    if (typeof body.ingredients === "string") {
      try {
        body.ingredients = JSON.parse(body.ingredients);
      } catch (e) {
        throw createHttpError(400, "Invalid ingredients format");
      }
    }

    // Validate by zod
    const validatedData = createRecipeSchema.parse(body);

    const newRecipe = await recipeService.createRecipe(validatedData, req.file);
    res.status(200).json({
      success: true,
      data: { recipe: newRecipe },
      message: "Recipe created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Read all recipe
export const getAllRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { meta, recipes } = await recipeService.getAllRecipe(req.valid.query);
    res.status(200).json({
      success: true,
      data: recipes,
      meta,
      message: "Recipes retrieved successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Read recipe by Id
export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipe = await recipeService.getRecipeById(req.valid.params);
    res.status(200).json({
      success: true,
      data: recipe,
      message: "Recipes retrieved successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Update recipe
export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = { ...req.body };

    // Change ingredients from string to array
    if (typeof body.ingredients === "string") {
      try {
        body.ingredients = JSON.parse(body.ingredients);
      } catch (e) {
        throw createHttpError(400, "Invalid ingredients format");
      }
    }

    // Validate by zod
    const validatedData = updateRecipeSchema.parse(body);

    const recipe = await recipeService.updateRecipe(
      req.valid.params,
      validatedData,
      req.file
    );

    res.status(200).json({
      success: true,
      data: recipe,
      message: "Recipe update successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Delete recipe
export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await recipeService.deleteRecipe(req.valid.params);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

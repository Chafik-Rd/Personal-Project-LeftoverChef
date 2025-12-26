import type { NextFunction, Request, Response } from "express";
import { IngredientService } from "../services/ingredient.service.js";

const ingredientService = new IngredientService();

// Create ingredient
export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredient = await ingredientService.createIngredient(req.valid.body);
    res.status(201).json({
      success: true,
      data: ingredient,
      message: "Ingredient created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Read all ingredient
export const getAllIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { meta, ingredients } = await ingredientService.getAllIngredient(
      req.valid.query
    );
    res.status(200).json({
      success: true,
      data: ingredients,
      meta,
      message: "Ingredients retrieved successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Update ingredient
export const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredient = await ingredientService.updateIngredient(
      req.valid.params,
      req.valid.body
    );

    res.status(200).json({
      success: true,
      data: ingredient,
      message: "Ingredient update successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Delete ingredient
export const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ingredientService.deleteIngredient(req.valid.params);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

import z from "zod";
import { INGREDIENT_UNITS } from "../../types/share.type.js";


// Create ingredient
export const createIngredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  unit: z.enum(INGREDIENT_UNITS, {
    error: () => ({ message: "Please select a valid unit" }),
  }),
});

// Update ingredient
export const updateIngredientSchema = createIngredientSchema.partial();

// Params ingredient
export const paramsIngredientSchema = z.object({
  ingredientId: z.coerce.number().min(1, "Ingredient id of params is required"),
});

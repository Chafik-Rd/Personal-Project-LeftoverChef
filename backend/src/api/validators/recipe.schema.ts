import z from "zod";
import { RECIPE_LEVEL } from "../../types/recipe.type.js";
import { INGREDIENT_UNITS } from "../../types/share.type.js";

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  unit: z.enum(INGREDIENT_UNITS, {
    error: () => ({ message: "Please select a valid unit" }),
  }),
});

// Create recipe
export const createRecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  calorie: z.coerce.number(),
  cookTime: z.coerce.number(),
  servings: z.coerce.number(),
  level: z.enum(RECIPE_LEVEL, {
    error: () => ({ message: "Please select a valid level" }),
  }),
  ingredients: z
    .array(ingredientSchema)
    .nonempty("At least one ingredient is required"),
});

// Update recipe
export const updateRecipeSchema = createRecipeSchema.partial();

// Params recipe
export const paramsRecipeSchema = z.object({
  recipeId: z.coerce.number().min(1, "Recipe id of params is required"),
});

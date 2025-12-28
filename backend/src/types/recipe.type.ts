import type { IngredientUnit } from "./share.type.js";

// All recipe levels
export const RECIPE_LEVEL = ["easy", "medium", "hard"] as const;

// Create type from array
export type RecipeLevel = (typeof RECIPE_LEVEL)[number];

export type Ingredients = {
  name: string;
  amount: number;
  unit: IngredientUnit;
};
// Type for create
export interface createRecipeType {
  name: string;
  description: string;
  calorie: number;
  cookTime: number;
  servings: number;
  level: RecipeLevel;
  ingredients: Ingredients[];
}

// Type for update
export type updateRecipeType = Partial<createRecipeType>;

// Type for params
export interface paramsRecipeType {
  recipeId: number;
}

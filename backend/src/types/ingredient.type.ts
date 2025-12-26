// All units
export const INGREDIENT_UNITS = [
  "g",
  "kg",
  "l",
  "ml",
  "tbsp",
  "tsp",
  "piece",
] as const;

// Create type from array
export type IngredientUnit = (typeof INGREDIENT_UNITS)[number];

// Type for create
export interface createIngredientType {
  name: string;
  unit: IngredientUnit;
}

// Type for update
export type updateIngredientType = Partial<createIngredientType>;

// Type for params
export interface paramsIngredientType {
  ingredientId: number;
}

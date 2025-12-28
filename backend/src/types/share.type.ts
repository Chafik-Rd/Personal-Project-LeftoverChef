// Type for Http Error
export interface HttpError extends Error {
  status?: number;
  message: string;
}

// Type for query
export interface queryType {
  page: number;
  limit: number;
}

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

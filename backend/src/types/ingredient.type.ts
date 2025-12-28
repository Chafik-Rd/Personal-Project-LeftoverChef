// Type for create
export interface createIngredientType {
  name: string;
}

// Type for update
export type updateIngredientType = Partial<createIngredientType>;

// Type for params
export interface paramsIngredientType {
  ingredientId: number;
}

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./Base.js";
import { Recipe } from "./Recipe.js";
import { Ingredient } from "./Ingredient.js";

@Entity()
export class RecipeIngredient extends Base {
  @Column({ name: "recipe_id", type: "int" })
  recipeId!: number;

  // Join ref to Recipe
  @ManyToOne((type) => Recipe, (recipe) => recipe.recipeIngredients)
  @JoinColumn({ name: "recipe_id" })
  recipe!: Recipe;

  @Column({ name: "ingredient_id", type: "int" })
  ingredientId!: number;

  // Join ref to Ingredient
  @ManyToOne((type) => Ingredient, (ingredient) => ingredient.recipeIngredients)
  @JoinColumn({ name: "ingredient_id" })
  ingredient!: Ingredient;

  @Column({ type: "decimal" })
  amount!: number;
}

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./Base.js";
import { Recipe } from "./Recipe.js";

@Entity()
export class RecipeInstruction extends Base {
  @Column({ name: "recipe_id", type: "int" })
  recipeId!: number;

  // Join ref Recipe
  @ManyToOne((type) => Recipe, (recipe) => recipe.recipeInstructions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "recipe_id" })
  recipe!: Recipe;

  @Column({ name: "step_number", type: "int" })
  stepNumber!: number;

  @Column({ type: "text" })
  instruction!: string;
}

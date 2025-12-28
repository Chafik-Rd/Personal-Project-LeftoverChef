import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { RecipeIngredient } from "./RecipeIngredient.js";
import { RecipeInstruction } from "./RecipeInstruction.js";
import type { RecipeLevel } from "../types/recipe.type.js";

@Entity()
export class Recipe extends Base {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int" })
  calorie!: number;

  @Column({ name: "cook_time", type: "int" })
  cookTime!: number;

  @Column({ type: "int" })
  servings!: number;

  @Column({ type: "varchar", comment: "Level of recipe (easy, medium, hard)" })
  level!: RecipeLevel;

  @Column({ name: "image_url", type: "text" })
  imageUrl!: string;

  @Column({ name: "image_public_id", type: "text" })
  imagePublicId!: string;

  @OneToMany(
    (type) => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe
  )
  recipeIngredients!: RecipeIngredient[];

  @OneToMany(
    (type) => RecipeInstruction,
    (recipeInstruction) => recipeInstruction.recipe
  )
  recipeInstructions!: RecipeInstruction[];
}

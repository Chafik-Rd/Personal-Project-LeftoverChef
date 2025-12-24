import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { RecipeIngredient } from "./RecipeIngredient.js";
import { RecipeInstruction } from "./RecipeInstruction.js";

enum RecipeLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

@Entity()
export class Recipe extends Base {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  slug!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int" })
  calorie!: number;

  @Column({ name: "cook_time", type: "int" })
  cookTime!: number;

  @Column({ type: "int" })
  servings!: number;

  @Column({ type: "enum", enum: RecipeLevel })
  level!: RecipeLevel;

  @Column({ type: "text" })
  image!: string;

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

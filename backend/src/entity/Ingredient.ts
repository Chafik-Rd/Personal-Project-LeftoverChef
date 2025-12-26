import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { RecipeIngredient } from "./RecipeIngredient.js";
import { UserIngredient } from "./UserIngredient.js";
import type { IngredientUnit } from "../types/ingredient.type.js";

@Entity()
export class Ingredient extends Base {
  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({
    type: "varchar",
    length: 10,
    comment: "Unit of measurement (e.g., g, kg, piece)",
  })
  unit!: IngredientUnit;

  @OneToMany(
    (type) => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient
  )
  recipeIngredients!: RecipeIngredient[];

  @OneToMany(
    (type) => UserIngredient,
    (userIngredient) => userIngredient.ingredient
  )
  userIngredient!: UserIngredient[];
}

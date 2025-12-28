import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { RecipeIngredient } from "./RecipeIngredient.js";
import { UserIngredient } from "./UserIngredient.js";

@Entity()
export class Ingredient extends Base {
  @Column({ type: "varchar", unique: true })
  name!: string;

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

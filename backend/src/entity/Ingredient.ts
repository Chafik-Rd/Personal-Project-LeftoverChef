import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { RecipeIngredient } from "./RecipeIngredient.js";
import { UserIngredient } from "./UserIngredient.js";

enum IngredientUnit {
  GRAM = "g",
  KILOGRAM = "kg",
  LITER = "l",
  MILLILITER = "ml",
  TABLESPOON = "tbsp",
  TEASPOON = "tsp",
  PIECE = "piece",
}

@Entity()
export class Ingredient extends Base {
  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({ type: "enum", enum: IngredientUnit })
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

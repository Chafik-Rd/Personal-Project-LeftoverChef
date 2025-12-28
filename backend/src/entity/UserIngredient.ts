import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./Base.js";
import { User } from "./User.js";
import { Ingredient } from "./Ingredient.js";

@Entity()
export class UserIngredient extends Base {
  @Column({ name: "user_id", type: "int" })
  userId!: number;

  // Join ref User
  @ManyToOne((type) => User, (user) => user.userIngredient, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "ingredient_id", type: "int" })
  ingredientId!: number;

  // Join ref User
  @ManyToOne((type) => Ingredient, (ingredient) => ingredient.userIngredient, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ingredient_id" })
  ingredient!: Ingredient;

  @Column({ type: "decimal" })
  amount!: number;

  @Column({ name: "expiry_date", type: "date" })
  expiryDate!: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Base } from "./Base.js";
import { UserIngredient } from "./UserIngredient.js";

@Entity()
export class User extends Base {
  @Column({ name: "first_name", type: "varchar" })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  passwaord!: string;

  @Column({ type: "varchar", default: "user" })
  role!: string;

  @OneToMany((type) => UserIngredient, (userIngredient) => userIngredient.user)
  userIngredient!: UserIngredient[];
}

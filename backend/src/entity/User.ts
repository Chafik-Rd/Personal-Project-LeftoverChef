import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Base } from "./Base.js";
import { UserIngredient } from "./UserIngredient.js";
import bcrypt from "bcrypt";
import type { UserRoles } from "../types/auth.type.js";

@Entity()
export class User extends Base {
  @Column({ name: "first_name", type: "varchar" })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  // Hash password
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    type: "varchar",
    default: "user",
    comment: "Role of user (user or admin)",
  })
  role!: UserRoles;

  @OneToMany((type) => UserIngredient, (userIngredient) => userIngredient.user)
  userIngredient!: UserIngredient[];
}

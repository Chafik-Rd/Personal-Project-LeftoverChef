import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import { Ingredient } from "./entity/Ingredient.js";
import { Recipe } from "./entity/Recipe.js";
import { RecipeIngredient } from "./entity/RecipeIngredient.js";
import { RecipeInstruction } from "./entity/RecipeInstruction.js";
import { UserIngredient } from "./entity/UserIngredient.js";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(isProduction
    ? { url: process.env.DATABASE_URL! }
    : {
        host: process.env.DB_HOST!,
        port: 5432,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
      }),
  synchronize: true,
  logging: false,

  // Cloud DB use SSL in Production
  ssl: isProduction ? { rejectUnauthorized: false } : false,

  entities: [
    User,
    Ingredient,
    Recipe,
    RecipeIngredient,
    RecipeInstruction,
    UserIngredient,
  ],
  migrations: [],
  subscribers: [],
});

import { AppDataSource } from "../../data-source.js";
import { Ingredient } from "../../entity/Ingredient.js";
import type {
  createIngredientType,
  paramsIngredientType,
  updateIngredientType,
} from "../../types/ingredient.type.js";
import type { queryType } from "../../types/share.type.js";
import { createHttpError } from "../../utils/createHttpError.js";
import { createPaginationMeta } from "../../utils/pagination.js";

export class IngredientService {
  private ingredintRepo = AppDataSource.getRepository(Ingredient);

  // Create ingredient
  async createIngredient(data: createIngredientType) {
    // Check name ingredient in database
    const existsIngredient = await this.ingredintRepo.findOneBy({
      name: data.name,
    });
    if (existsIngredient)
      throw createHttpError(409, "Name already in ingredient!");

    // Create new ingredient
    const newIngredient = this.ingredintRepo.create(data);
    await this.ingredintRepo.save(newIngredient);

    return newIngredient;
  }

  // Read all ingredients
  async getAllIngredient(query: queryType) {
    const skip = (query.page - 1) * query.limit;

    const [ingredients, total] = await this.ingredintRepo.findAndCount({
      take: query.limit,
      skip,
    });

    // Pagination
    const { meta } = createPaginationMeta(total, query.page, query.limit, skip);

    return { meta, ingredients };
  }

  // Update ingredient
  async updateIngredient(
    params: paramsIngredientType,
    data: updateIngredientType
  ) {
    const ingredient = await this.ingredintRepo.findOneBy({
      id: params.ingredientId,
    });

    // Check ingredient in database
    if (!ingredient) throw createHttpError(404, "Ingredient not found!");

    // Update data
    if (data.name !== undefined) ingredient.name = data.name;

    await this.ingredintRepo.save(ingredient);

    return ingredient;
  }

  // Delete ingredient
  async deleteIngredient(params: paramsIngredientType) {
    const ingredient = await this.ingredintRepo.findOneBy({
      id: params.ingredientId,
    });

    // Check ingerdient in database
    if (!ingredient) throw createHttpError(404, "Ingredient not found!");

    await this.ingredintRepo.remove(ingredient);
  }
}

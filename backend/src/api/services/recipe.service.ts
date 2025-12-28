import { In, type QueryRunner } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { Ingredient } from "../../entity/Ingredient.js";
import { Recipe } from "../../entity/Recipe.js";
import { RecipeIngredient } from "../../entity/RecipeIngredient.js";
import type {
  createRecipeType,
  Ingredients,
  paramsRecipeType,
  updateRecipeType,
} from "../../types/recipe.type.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import type { queryType } from "../../types/share.type.js";
import { createPaginationMeta } from "../../utils/pagination.js";
import { createHttpError } from "../../utils/createHttpError.js";

export class RecipeService {
  private recipeRepo = AppDataSource.getRepository(Recipe);

  // Create or Update recipe ingredient
  private async syncRecipeIngredients(
    queryRunner: QueryRunner,
    recipeId: number,
    ingredientsData: Ingredients[]
  ) {
    // Manage inagerdient name
    const ingerdientName = ingredientsData.map((ingredient) => ingredient.name);

    // Retrieve ingredients from database by name in ingerdientName
    const existingIngredients = await queryRunner.manager.find(Ingredient, {
      where: { name: In(ingerdientName) },
    });

    // Create class Map
    const ingredientMap = new Map(
      existingIngredients.map((ingredient) => [ingredient.name, ingredient])
    );

    const recipeIngredients: RecipeIngredient[] = [];

    for (const item of ingredientsData) {
      let ingredient = ingredientMap.get(item.name);

      // Check ingredient in databse
      if (!ingredient) {
        ingredient = queryRunner.manager.create(Ingredient, {
          name: item.name,
        });
        ingredient = await queryRunner.manager.save(ingredient);
        ingredientMap.set(ingredient.name, ingredient);
      }

      // Create recipe_ingredient
      const recipeIngredient = queryRunner.manager.create(RecipeIngredient, {
        recipeId: recipeId,
        ingredientId: ingredient.id,
        amount: item.amount,
        unit: item.unit,
      });
      recipeIngredients.push(recipeIngredient);
    }
    await queryRunner.manager.save(RecipeIngredient, recipeIngredients);
  }

  // Create recipe
  async createRecipe(data: createRecipeType, fileImage: Express.Multer.File) {
    const queryRunner = AppDataSource.createQueryRunner();
    let uploadedImageData: { url: string; publicId: string } | null = null;

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Upload image
      const result = await uploadImage(fileImage);
      uploadedImageData = {
        url: result.secure_url,
        publicId: result.public_id,
      };

      // Create main recipe
      const newRecipe = queryRunner.manager.create(Recipe, {
        ...data,
        imageUrl: result.secure_url,
        imagePublicId: result.public_id,
      });
      const savedRecipe = await queryRunner.manager.save(newRecipe);

      // Create recipe ingredient
      await this.syncRecipeIngredients(
        queryRunner,
        savedRecipe.id,
        data.ingredients
      );

      // Commit transaction
      await queryRunner.commitTransaction();
      return newRecipe;
    } catch (err) {
      // Rollback transaction
      await queryRunner.rollbackTransaction();

      // Delete image at cloudinary
      if (uploadedImageData) await deleteImage(uploadedImageData?.publicId);

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Read all recipes
  async getAllRecipe(query: queryType) {
    const skip = (query.page - 1) * query.limit;

    const [recipes, total] = await this.recipeRepo.findAndCount({
      take: query.limit,
      skip,
    });

    // Pagination
    const { meta } = createPaginationMeta(total, query.page, query.limit, skip);

    return { meta, recipes };
  }

  // Read recipe by Id
  async getRecipeById(params: paramsRecipeType) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        id: params.recipeId,
      },
      relations: {
        recipeIngredients: { ingredient: true },
      },
      select: {
        recipeIngredients: {
          id: true,
          ingredient: { name: true },
          amount: true,
          unit: true,
        },
      },
    });
    if (!recipe) return null;

    const { recipeIngredients, ...newRecipe } = recipe;
    return {
      ...newRecipe,
      ingredients: recipe.recipeIngredients.map((ri) => ({
        id: ri.id,
        name: ri.ingredient.name,
        amount: ri.amount,
        unit: ri.unit,
      })),
    };
  }

  // Update recipe
  async updateRecipe(
    params: paramsRecipeType,
    data: updateRecipeType,
    fileImage?: Express.Multer.File
  ) {
    const queryRunner = AppDataSource.createQueryRunner();
    let newUploadedPublicId: string | null = null;

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Retrieve recipe from database by id
      const recipe = await queryRunner.manager.findOne(Recipe, {
        where: {
          id: params.recipeId,
        },
        relations: {
          recipeIngredients: { ingredient: true },
        },
      });

      // Check recipe in database
      if (!recipe) throw createHttpError(404, "Recipe not found!");

      let updateFields: any = { ...data };

      // Check image form request
      if (fileImage) {
        const uploadResult = await uploadImage(fileImage);
        updateFields.imageUrl = uploadResult.secure_url;
        updateFields.imagePublicId = uploadResult.public_id;
        newUploadedPublicId = uploadResult.public_id;
      }
      const cleanData = Object.fromEntries(
        Object.entries(updateFields).filter(([_, value]) => value !== undefined)
      );

      // Merge cleanData in  recipe
      Object.assign(recipe, cleanData);
      await queryRunner.manager.save(recipe);

      // Update ingredients
      if (data.ingredients) {
        await queryRunner.manager.delete(RecipeIngredient, {
          recipeId: params.recipeId,
        });
        // Create recipe ingredient
        await this.syncRecipeIngredients(
          queryRunner,
          params.recipeId,
          data.ingredients
        );
      }

      const { recipeIngredients, ...updateRecipe } = recipe;
      // Commit transaction
      await queryRunner.commitTransaction();
      return updateRecipe;
    } catch (err) {
      // Rollback transaction
      await queryRunner.rollbackTransaction();

      // Delete image at cloudinary
      if (newUploadedPublicId) await deleteImage(newUploadedPublicId);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Delete recipe
  async deleteRecipe(params: paramsRecipeType) {
    const recipe = await this.recipeRepo.findOneBy({ id: params.recipeId });

    // Check recipe in database
    if (!recipe) throw createHttpError(404, "Recipe not found!");

    await deleteImage(recipe.imagePublicId);

    await this.recipeRepo.remove(recipe);
  }
}

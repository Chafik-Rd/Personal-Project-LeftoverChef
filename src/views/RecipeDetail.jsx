import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InfoTag } from "../components/InfoTag";
import { Level } from "../components/Level";
import { recommendedMenu } from "../data/recommendedMenu";
import { userIngredients } from "../data/userIngredients";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const recipe = recommendedMenu.find((r) => r.id === Number(recipeId));
  const infoLists = [
    { icon: "Clock", value: recipe.cook_time, unit: "นาที" },
    { icon: "Users", value: recipe.servings, unit: "ที่" },
    { icon: "Cal", value: recipe.calorie, unit: "kcal" },
  ];
  return (
    <div className="min-h-[calc(100vh-124px)] px-6 sm:px-8 py-4 bg-beige-200">
      <div className="flex items-center gap-2 cursor-pointer">
        <ArrowLeft />
        <p>ย้อนกลับ</p>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-6 max-w-300 w-full">
          {/* Info recipe */}
          <Card className="flex flex-cocenterl md:flex-row p-6 sm:p-7">
            <img
              src={recipe.img.url}
              alt={recipe.img.alt}
              className="rounded w-full sm:h-95 md:h-auto md:w-1/2"
            />

            <div className="flex flex-col gap-3 md:w-1/2">
              <section>
                <h2 className="text-xl sm:text-4xl font-bold capitalize">
                  {recipe.name}
                </h2>
                <div className="flex gap-2 mt-2 items-center">
                  {infoLists.map((info, index) => (
                    <InfoTag
                      key={index}
                      icon={info.icon}
                      text={`${info.value}${info.unit}`}
                    />
                  ))}
                  <Level level={recipe.level} />
                </div>
              </section>
              <section>
                <h3 className="text-xl sm:text-3xl font-medium">คำอธิบาย</h3>
                <p className="mt-1">{recipe.description}</p>
              </section>
            </div>
          </Card>

          {/* Ingredient recipe */}
          <Card className="flex flex-col p-6 sm:p-7 max-w-300">
            <h3 className="text-xl sm:text-3xl font-medium">วัตถุดิบ</h3>

            <div className="flex gap-8 w-full">
              <section className="w-full">
                <h4 className="sm:text-xl font-medium px-4 rounded-lg bg-green-100 mb-4">
                  วัตถุดิบหลัก:
                </h4>
                <ul className="flex flex-col gap-2 w-full px-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between w-full">
                      <span>{ingredient.name}</span>
                      <span>{`${ingredient.amount} ${ingredient.unit}`}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="w-full">
                <h4 className="sm:text-xl font-medium px-4 rounded-lg bg-blush mb-4">
                  วัตถุดิบเพิ่มเติม:
                </h4>
                <ul className="flex flex-col gap-2 w-full px-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between w-full">
                      <span>{}</span>
                      <span>dddd</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Card>

          {/* Ingredient recipe */}
          <Card className="flex flex-col p-6 sm:p-7 max-w-300">
            <h3 className="text-xl sm:text-3xl font-medium">วิธีทำ</h3>
            {recommendedMenu.map((item, index) => (
              <div className="flex flex-col md:flex-row gap-4 p-3 rounded-lg bg-beige-200">
                <span className="rounded-full bg-beige-400 h-8 w-8 p-3 flex justify-center items-center text-xl font-medium">
                  {index + 1}
                </span>
                <div className="p-3 bg-white border border-brown-600">
                  <p>{item.instructions}</p>
                </div>
              </div>
            ))}
          </Card>

          <div className="flex gap-3 justify-center w-full">
            <Button
              variant="outline"
              size="lg"
              className="border-brown-600 text-2xl font-medium"
            >
              กลับไปยังรายการ
            </Button>
            <Button size="lg" className="text-2xl font-medium">
              <ChefHat className="size-8"  />
              เริ่มทำอาหาร
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

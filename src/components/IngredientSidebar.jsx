import { IngredientCard } from "./IngredientCard";
import { userIngredients } from "../data/userIngredients";
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react";

export const IngredientSidebar = () => {
  return (
    <div className="h-[calc(100vh-124px)] hidden md:flex flex-col bg-beige-300 w-60 border-1 border-brown-600 text-brown-700">
      <section className="flex flex-col gap-4 p-4 font-medium border-b-1 border-brown-600">
        <h2 className="text-2xl">วัตถุดิบของฉัน</h2>
        <Button size="lg" className="cursor-pointer text-xl">
                <Plus className="size-8" />
                เพิ่มวัตถุดิบ
        </Button>
        <div className="flex gap-1 items-center justify-end text-gray-500 font-normal cursor-pointer hover:scale-95">
          <Trash2 size={16} />
          <p>ล้างทั้งหมด</p>
        </div>
      </section>
      <section
        section
        className="flex flex-col p-4 gap-3 items-end felx-1 overflow-y-auto"
      >
        {userIngredients.map((ingredient) => {
          return (
            <IngredientCard
            key={ingredient.id}
            icon={ingredient.img}
              ingredient={ingredient}
            />
          );
        })}
      </section>
    </div>
  );
};

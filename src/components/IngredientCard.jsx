import { Badge } from "@/components/ui/badge";
export const IngredientCard = ({ icon, ingredient }) => {
  return (
    <div className="relative flex gap-3 items-center p-4 bg-white w-full rounded-3xl border-1 border-brown-600 shadow-md hover:shadow-lg">
      <span className="absolute -top-1 -right-1 bg-gray-300 opacity-95 rounded-full w-fit h-fit p-1 cursor-pointer hover:scale-95">
        <img src="./src/assets/images/x-gray.svg" alt="" />
      </span>
      <section className="h-8">
        <img src={icon.url} alt={icon.alt} className="w-full h-full"/>
      </section>
      <section className="font-medium">
        <p className="mb-1">{ingredient.name}</p>
          <Badge className="bg-beige-200 text-brown-700 text-sm">
            {ingredient.amount} {ingredient.unit}
          </Badge>
      </section>
    </div>
  );
};

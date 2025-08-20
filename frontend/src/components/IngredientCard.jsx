import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';

export const IngredientCard = ({ icon, ingredient }) => {
  return (
    <div className="relative flex gap-3 items-center p-4 bg-white w-full rounded-3xl border-1 border-brown-600 shadow-md hover:shadow-lg">
      <span className="absolute -top-1 -right-1 bg-gray-300 opacity-95 rounded-full w-fit h-fit p-1 cursor-pointer hover:scale-95">
        <X size={12} />
      </span>

      {/* Icon ingredient */}
      <section className="h-8">
        <img src={icon.url} alt={icon.alt} className="w-full h-full"/>
      </section>

      {/* Name and amount */}
      <section className="font-medium">
        <p className="mb-1">{ingredient.name}</p>
          <Badge className="bg-beige-200 text-brown-700 text-sm">
            {ingredient.amount} {ingredient.unit}
          </Badge>
      </section>
    </div>
  );
};

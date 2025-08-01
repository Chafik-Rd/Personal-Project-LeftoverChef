import { Tag } from "./Tag";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";

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
        <Tag text={`${ingredient.amount} ${ingredient.unit}`} style={"bg-beige-200"}/>
      </section>
    </div>
    // <Card className="relative flex-row border-brown-600 p-4 items-center w-full gap-3 rounded-3xl">
    //   <CircleX strokeWidth={1.5} className="absolute -top-1 -right-1" />
    //   <img src={icon.url} alt={icon.alt} className="h-8" />
    //   <CardContent>
    //     <CardTitle className="mb-1 text-brown-700">{ingredient.name}</CardTitle>
    //     <Badge className="bg-beige-200 text-brown-700">
    //       {ingredient.amount} {ingredient.unit}
    //     </Badge>
    //   </CardContent>
    // </Card>
  );
};

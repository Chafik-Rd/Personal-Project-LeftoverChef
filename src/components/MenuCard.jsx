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
import { Heart, Eye, Clock4, Users, ChefHat } from "lucide-react";

export const MenuCard = ({
  name,
  description,
  img,
  time,
  menuForPeople,
  level,
}) => {
  const levels = {
    easy: { style: "text-green-500 bg-green-100", text: "ง่าย", icon: 1 },
    medium: {
      style: "text-orange-700 bg-orange-100",
      text: "ปานกลาง",
      icon: 2,
    },
    hard: { style: "text-red-400 bg-red-100", text: "ยาก", icon: 3 },
  };

  return (
    <>
      <Card className="pt-0 gap-2 cursor-pointer hover:shadow-lg min-w-65">
        <img
          src={img.url}
          alt={img.alt}
          className="h-44 object-cover rounded-t-xl mb-3"
        />
        <CardHeader>
          <CardTitle className="text-xl text-brown-700 capitalize">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-gray-600">
          <div className="flex gap-2 text-gray-600">
            <div className="flex gap-1 items-center">
              <Clock4 size={16} strokeWidth={1.5} />
              <p>{time}</p>
            </div>
            <div className="flex gap-1 items-center">
              <Users size={16} strokeWidth={1.5} />
              <p>{menuForPeople}</p>
            </div>
          </div>
          <Badge
            className={`flex gap-1 items-center mt-2 ${
              levels[`${level}`].style
            }`}
          >
            {[...Array(levels[`${level}`].icon)].map(() => (
              <ChefHat size={18} strokeWidth={2} />
            ))}
            <p>{levels[`${level}`].text}</p>
          </Badge>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end text-sm font-light text-gray-500">
          <div className="flex gap-1 items-center">
            <Heart size={14} strokeWidth={1.5} />
            <p>20k</p>
          </div>
          <div className="flex gap-1 items-center">
            <Eye size={14} strokeWidth={1.5} />
            <p>20k</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

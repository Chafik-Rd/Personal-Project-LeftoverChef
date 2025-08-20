import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Eye, Clock4, Users } from "lucide-react";
import { Level } from "./Level";
import { InfoTag } from "./InfoTag";

export const MenuCard = ({ name, description, img, level, infos, onClick }) => {
  return (
    <>
      <Card
        onClick={onClick}
        className="pt-0 gap-2 cursor-pointer hover:shadow-lg min-w-65"
      >
        <img
          src={img.url}
          alt={img.alt}
          className="h-44 object-cover rounded-t-xl mb-3"
        />
        <CardHeader>
          <CardTitle className="text-xl text-brown-700 capitalize">
            {name}
          </CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-gray-600">
          <div className="flex gap-2 text-gray-600">
            {infos.map((info,index) => (
              <InfoTag key={index} icon={info.icon} text={`${info.value}${info.unit}`} />
            ))}
          </div>

          {/* Level recipes */}
          <Level level={level} />
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

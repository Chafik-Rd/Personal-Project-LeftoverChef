import { Badge } from "@/components/ui/badge";
import { ChefHat } from "lucide-react";
const levels = {
  easy: { style: "text-green-500 bg-green-100", text: "ง่าย", icon: 1 },
  medium: {
    style: "text-orange-700 bg-orange-100",
    text: "ปานกลาง",
    icon: 2,
  },
  hard: { style: "text-red-400 bg-red-100", text: "ยาก", icon: 3 },
};
export const Level = ({level}) => {
  return (
    <Badge
      className={`flex gap-1 items-center mt-2 ${levels[`${level}`].style}`}
    >
      {[...Array(levels[`${level}`].icon)].map((icon, index) => (
        <ChefHat key={index} size={18} strokeWidth={2} />
      ))}
      <p>{levels[`${level}`].text}</p>
    </Badge>
  );
};

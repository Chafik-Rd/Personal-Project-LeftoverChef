import { Heart, Eye, Clock4, Users } from "lucide-react";
export const InfoTag = ({ icon, text }) => {
  const icons = {
    Clock: Clock4,
    Users: Users,
  };
  const IconComponent = icons[icon];
  return (
    <>
      <div className="flex gap-1 items-center text-gray-600">
        <IconComponent size={16} strokeWidth={1.5} />
        <p>{text}</p>
      </div>
    </>
  );
};

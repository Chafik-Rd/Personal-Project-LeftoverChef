import { IngredientSidebar } from "./IngredientSidebar";
import { Menu } from "./Menu";

export const Home = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-beige-200 flex">
      <IngredientSidebar/>
      <Menu/>
    </div>
  );
};

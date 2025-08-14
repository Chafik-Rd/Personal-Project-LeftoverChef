import { useState } from "react";
import { IngredientSidebar } from "../components/IngredientSidebar";
import { Menu } from "../components/Menu";

export const Home = () => {
  const [showIngredient, setShowIngredient] = useState(false);
  return (
    <div className="min-h-[calc(100vh-124px)] bg-beige-200 flex">
      {/* Desktop ingredient sidebar */}
      <div className="hidden md:block">
        <IngredientSidebar />
      </div>

      {/* Mobile ingredient sidebar */}
      {showIngredient && (
        <div className="md:hidden fixed z-15 top-0 left-0 w-full h-full bg-black/80">
          <IngredientSidebar onClick={setShowIngredient} />
        </div>
      )}
      <Menu onClick={setShowIngredient} />
    </div>
  );
};

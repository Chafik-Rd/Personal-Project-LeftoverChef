import { useState } from "react";
import { IngredientSidebar } from "../components/IngredientSidebar";
import { Menu } from "../components/Menu";
import { MainBackground } from "../components/MainBackground";

export const Home = () => {
  const [showIngredient, setShowIngredient] = useState(false);
  return (
    <MainBackground className="flex">
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
    </MainBackground>
  );
};

import { useState } from "react";
import { MessageContext } from "./MessageContext";
import { useEffect } from "react";

export const MessageProvider = ({ children }) => {
  const [allUserIngre, setAllUserIngre] = useState([]);

  const handleUserIngre = (ingre) => {
    const userIngre = allUserIngre.find(
      (userIngre) => userIngre.name === ingre.name
    );

    if (typeof userIngre === "object") {
      console.log(ingre);
      userIngre.quantity = String(Number(userIngre.quantity) + Number(ingre.quantity) || 1);
      setAllUserIngre([...allUserIngre]);
    } else {
      setAllUserIngre([...allUserIngre, ingre]);
    }
  };

  // Read data from local storage
  useEffect(() => {
    if (localStorage.getItem("userIngre")) {
      setAllUserIngre(JSON.parse(localStorage.getItem("userIngre")));
    }
  }, []);

  // Set data at local storage when orders have change
  useEffect(() => {
    if (allUserIngre.length > 0) {
      localStorage.setItem("userIngre", JSON.stringify(allUserIngre));
    }
  }, [allUserIngre]);

  return (
    <MessageContext value={{ allUserIngre, setAllUserIngre, handleUserIngre }}>
      {children}
    </MessageContext>
  );
};

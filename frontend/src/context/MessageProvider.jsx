import { useState } from "react";
import { MessageContext } from "./MessageContext";
import { useEffect } from "react";

export const MessageProvider = ({ children }) => {
  const [allUserIngre, setAlluserIngre] = useState([]);

  const handleUserIngre = (ingre) => {
    const userIngre = allUserIngre.find(
      (userIngre) => userIngre.name === ingre.name
    );

    if (typeof userIngre === "object") {
      userIngre.quantity += ingre.quantity || 1;
      setAlluserIngre([...allUserIngre]);
    } else {
      setAlluserIngre([...allUserIngre, ingre]);
    }
  };

  // Read data from local storage
  useEffect(() => {
    if (localStorage.getItem("userIngre")) {
      setAlluserIngre(JSON.parse(localStorage.getItem("userIngre")));
    }
  }, []);

  // Set data at local storage when orders have change
  useEffect(() => {
    if (allUserIngre.length > 0) {
      localStorage.setItem("userIngre", JSON.stringify(allUserIngre));
    }
  }, [allUserIngre]);

  return (
    <MessageContext value={{ allUserIngre, setAlluserIngre, handleUserIngre }}>
      {children}
    </MessageContext>
  );
};

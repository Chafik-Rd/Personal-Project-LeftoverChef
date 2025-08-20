import { useState } from "react";
import { MessageContext } from "./MessageContext";

export const MessageProvider = ({ children }) => {
  const [userIngre, setUserIngre] = useState([
    {
      name: "",
      amount: "",
      unit: "",
      img: "",
    },
  ]);

//   console.log(userIngre);

  const handleUserIngre = (e) => {
    setUserIngre({ ...userIngre, [e.traget.name]: e.traget.value });
  };
  return (
    <MessageContext value={{ handleUserIngre }}>{children}</MessageContext>
  );
};

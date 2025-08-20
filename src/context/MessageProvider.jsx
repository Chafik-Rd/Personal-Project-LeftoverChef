import { useState } from "react";
import { MessageContext } from "./MessageContext";

export const MessageProvider = ({ children }) => {
  const [userIngre, setUserIngre] = useState({
    name: "",
    amount: "",
    unit: "",
    img: "",
  });

  return (
    <MessageContext value={{ userIngre, setUserIngre }}>
      {children}
    </MessageContext>
  );
};

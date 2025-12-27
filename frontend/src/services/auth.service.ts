import { registerType } from "@/types/auth.type";
import api from "./api";

// Register
export const register = async (data: registerType) => {
  const response = await api.post("/api/register", data);
  return response.data;
};

// Login
export const login = async (email: string, password: string) => {
  const response = await api.post("/api/login", { email, password });
  return response.data;
};

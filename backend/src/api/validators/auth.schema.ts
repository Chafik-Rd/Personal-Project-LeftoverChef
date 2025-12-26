import { z } from "zod";

// User loging
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address").min(1,"Email is required"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

// User redister
export const userRegisterSchema = userLoginSchema.extend({
  firstName: z.string().min(1,"First name is required"),
  lastName: z.string().min(1,"Last name is required"),
});

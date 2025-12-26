import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

// User register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.register(req.valid.body);
    res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// User login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token } = await authService.login(req.valid.body);

    // Set token in HTTP-only cookie
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      success: true,
      data: { user, token },
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};

// User logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set token in HTTP-only cookie
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("accessToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
};

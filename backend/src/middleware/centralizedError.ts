import type { NextFunction, Request, Response } from "express";
import type { HttpError } from "../types/express.type.js";

export const centralizedError = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

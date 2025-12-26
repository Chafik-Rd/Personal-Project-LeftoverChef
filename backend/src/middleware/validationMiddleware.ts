import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validateData =
  (schema: ZodSchema, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req[property]);

      // Express version 5 req.query is read only
      if (!req.valid) req.valid = {};
      req.valid[property] = validatedData;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: err.issues.map((issues) => ({
            path: issues.path.join("."),
            message: issues.message,
          })),
        });
      }
      next(err);
    }
  };

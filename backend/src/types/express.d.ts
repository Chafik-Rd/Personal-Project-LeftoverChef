import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      valid: {
        body?: any;
        query?: any;
        params?: any;
      };
    }
  }
}
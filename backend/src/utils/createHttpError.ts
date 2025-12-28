import type { HttpError } from "../types/share.type.js";


export const createHttpError = (code: number, message: string) => {
  const error: HttpError = new Error(message);
  error.status = code;
  return error;
};

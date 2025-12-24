// Type for Http Error
export interface HttpError extends Error {
  status?: number;
  message: string;
}
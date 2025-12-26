// Type for Http Error
export interface HttpError extends Error {
  status?: number;
  message: string;
}

// Type for query
export interface queryType {
  page: number;
  limit: number;
}

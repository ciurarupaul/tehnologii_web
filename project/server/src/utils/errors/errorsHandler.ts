import AppError from "./appError";

export const handleCastErrorDB = (err: any): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (err: any): AppError => {
  const match = err.message.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : "duplicate";
  return new AppError(
    `Duplicate field value: ${value}. Please use another.`,
    400
  );
};

export const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors || {}).map((e: any) => e.message);
  return new AppError(`Invalid input. ${errors.join(" ")}`, 400);
};

export const handleJWTError = (): AppError =>
  new AppError("Invalid token. Please log in again.", 401);

export const handleJWTExpiredError = (): AppError =>
  new AppError("Token expired. Please log in again.", 401);

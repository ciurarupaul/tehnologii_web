import type {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

import AppError from './appError';

// sequelize validation errors
export function handleSequelizeValidationError(err: ValidationError): AppError {
  const errors = err.errors.map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

// sequelize specific errors
export function handleSequelizeUniqueConstraintError(err: UniqueConstraintError): AppError {
  const value = err.errors[0]?.value ?? 'unknown';
  const field = err.errors[0]?.path ?? 'unknown';
  const message = `Duplicate field value: "${value}" for field "${field}". Please use another.`;
  return new AppError(message, 400);
}

// fk errors
export function handleSequelizeForeignKeyConstraintError(err: ForeignKeyConstraintError): AppError {
  const message = `Invalid reference. The ${err.fields ? err.fields[0] : 'field'} you provided does not exist in the database.`;
  return new AppError(message, 400);
}

// general database errors
export function handleSequelizeDatabaseError(err: DatabaseError): AppError {
  return new AppError(`Database error: ${err.message}`, 400);
}

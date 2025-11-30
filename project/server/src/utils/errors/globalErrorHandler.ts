import type { NextFunction, Request, RequestHandler, Response } from 'express';

import config from '../../core/config';
import AppError from './appError';
import {
  handleSequelizeDatabaseError,
  handleSequelizeForeignKeyConstraintError,
  handleSequelizeUniqueConstraintError,
  handleSequelizeValidationError,
} from './errorsHandler';

export const notFoundHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

function sendErrorDev(err: AppError, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErrorProd(err: AppError, res: Response) {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // programming or other unknown error
  console.error('Unexpected Error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong.',
  });
}

function globalErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.nodeEnv === 'development') {
    sendErrorDev(err, res);
  }
  else {
    let error = { ...err, message: err.message, name: err.name };

    // 1. invalid ids / db generic errors
    if (error.name === 'SequelizeDatabaseError')
      error = handleSequelizeDatabaseError(err);

    // 2. duplicate fields
    if (error.name === 'SequelizeUniqueConstraintError')
      error = handleSequelizeUniqueConstraintError(err);

    // 3. calidatation errors
    if (error.name === 'SequelizeValidationError')
      error = handleSequelizeValidationError(err);

    // 4. fk constraints
    if (error.name === 'SequelizeForeignKeyConstraintError')
      error = handleSequelizeForeignKeyConstraintError(err);

    sendErrorProd(error as AppError, res);
  }
}

export default globalErrorHandler;

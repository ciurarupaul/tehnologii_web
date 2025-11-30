import type { NextFunction, Request, RequestHandler, Response } from 'express';

type catchAsyncProps = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export function catchAsync(fn: catchAsyncProps): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

import type { Response } from 'express';

type ResponseProps<T = unknown> = {
  status: 'success' | 'fail'
  data?: T
};

export function sendResponse<T>(res: Response, statusCode: number, data?: T): Response {
  const response: ResponseProps<T | null> = {
    status: statusCode >= 400 ? 'fail' : 'success',
    data: data ?? null,
  };

  return res.status(statusCode).json(response);
}

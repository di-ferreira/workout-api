import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../../../@types/index';
import { ApiError } from '../../helpers/ApiErrors';

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};

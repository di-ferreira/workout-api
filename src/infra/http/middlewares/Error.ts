import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../../../@types/index';
import { ApiError } from '../../helpers/ApiErrors';

export const errorMiddleware = async (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('error middleware message', error.message);
  console.log('error middleware status code', error.statusCode);

  const statusCode = error.statusCode
    ? error.statusCode
    : STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message =
    error.message !== '' ? error.message : 'Internal Server Error';
  res.status(statusCode).json({ message });
};

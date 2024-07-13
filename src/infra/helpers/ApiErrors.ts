import { STATUS_CODE } from '../../@types/index';
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, STATUS_CODE.BAD_REQUEST);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, STATUS_CODE.NOT_FOUND);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, STATUS_CODE.UNAUTHORIZED);
  }
}

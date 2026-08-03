import { STATUS_CODES } from './constant.js';

export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.FORBIDDEN);
  }
}

export class EntityNotFoundError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.NOT_FOUND);
  }
}

export class EntityAlreadyExistsError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.CONFLICT);
  }
}

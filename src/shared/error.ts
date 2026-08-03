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

export class PasswordMismatchError extends AppError {
  constructor() {
    super('username or password is not valid', STATUS_CODES.BAD_REQUEST);
  }
}

export class EntityNotFoundError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}

export class EntityAlreadyExistsError extends AppError {
  constructor(message: string) {
    super(message, STATUS_CODES.BAD_REQUEST);
  }
}

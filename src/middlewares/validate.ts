import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../shared/error.js';

const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) throw new ValidationError('Input Validation Error');
    req.body = result.data;
    next();
  };
};

export default validate;

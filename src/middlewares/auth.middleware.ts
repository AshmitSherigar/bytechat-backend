import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../constants/statusCodes.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
  userId: string;
}
export const authMiddlleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || req.headers.Authorization) as string;

    if (!token)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Invalid token' });
    const authToken = token.split(' ')[1];

    if (!authToken)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Invalid token' });

    const access_secret = process.env.ACCESS_TOKEN_SECRET;
    if (!access_secret) throw Error('Access Token Missing');

    const decoded = jwt.verify(authToken, access_secret) as AuthPayload;
    res.locals.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

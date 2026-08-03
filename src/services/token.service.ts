import jwt, { JwtPayload } from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';
import env from '../config/env.js';
import { UnauthorizedError } from '../shared/error.js';

interface RefreshTokenPayload extends JwtPayload {
  id: string;
}

export const generateAccessToken = (userID: string) => {
  const accessToken = jwt.sign({ id: userID }, env.ACCESS_TOKEN_SECRET, jwtConfig.accessConfig);
  return accessToken;
};
export const generateRefreshToken = (userID: string) => {
  const refreshToken = jwt.sign({ id: userID }, env.REFRESH_TOKEN_SECRET, jwtConfig.refreshConfig);
  return refreshToken;
};
export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
    if (typeof decoded === 'string' || typeof decoded.id !== 'string') {
      throw new UnauthorizedError('Invalid refresh token payload');
    }
    return { id: decoded.id };
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
};

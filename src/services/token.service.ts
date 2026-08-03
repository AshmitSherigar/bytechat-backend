import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';
import env from '../config/env.js';

export const generateAccessToken = (userID: string) => {
  const accessToken = jwt.sign({ id: userID }, env.ACCESS_TOKEN_SECRET, jwtConfig.accessConfig);
  return accessToken;
};
export const generateRefreshToken = (userID: string) => {
  const refreshToken = jwt.sign({ id: userID }, env.REFRESH_TOKEN_SECRET, jwtConfig.refreshConfig);
  return refreshToken;
};
export const verify = async (token: string) => {};

import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service.js';
import { STATUS_CODES } from '../shared/constant.js';
import cookieConfig from '../config/cookie.js';

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { user, accessToken, refreshToken } = await AuthService.login(username, password);

  res.cookie('refreshToken', refreshToken, cookieConfig);

  return res
    .status(STATUS_CODES.OK)
    .json({ success: true, message: 'User login successfully', accessToken });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { user, accessToken, refreshToken } = await AuthService.register(username, password);

  res.cookie('refreshToken', refreshToken, cookieConfig);

  return res
    .status(STATUS_CODES.CREATED)
    .json({ success: true, message: 'User register successfully', accessToken });
};

export const logoutUser = async (req: Request, res: Response) => {
  // on client also delete the access token
  const refreshToken = req.cookies.refreshToken;

  await AuthService.logout(refreshToken);

  res.clearCookie('refreshToken');
  return res.status(STATUS_CODES.OK).json({ success: true, message: 'User logout successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
  const oldRefreshToken = req.cookies.refreshToken;
  res.clearCookie('refreshToken');
  const { accessToken, refreshToken } = await AuthService.refresh(oldRefreshToken);

  res.cookie('refreshToken', refreshToken, cookieConfig);

  return res
    .status(STATUS_CODES.OK)
    .json({ success: true, message: "Token's Rotated Successfully", accessToken });
};

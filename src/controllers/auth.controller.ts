import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { STATUS_CODES } from '../constants/statusCodes.js';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Invalid input format' });
    }
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ success: false, message: 'User already exists' });

    const newUser = await User.create({ username, password });

    const access_secret = process.env.ACCESS_TOKEN_SECRET;
    if (!access_secret) throw Error('Access Token Missing');

    const accessToken = jwt.sign({ userId: newUser._id }, access_secret, { expiresIn: '30d' });

    return res
      .status(STATUS_CODES.CREATED)
      .json({ success: true, message: 'User created successfully', accessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Invalid input format' });
    }

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ success: false, message: 'User does not exist' });

    const isPasswordMatched = password === user.password;
    if (!isPasswordMatched) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ success: false, message: 'Username or password do not match' });
    }

    const access_secret = process.env.ACCESS_TOKEN_SECRET;
    if (!access_secret) throw Error('Access Token Missing');
    const accessToken = jwt.sign({ userId: user._id }, access_secret, { expiresIn: '30d' });

    return res
      .status(STATUS_CODES.CREATED)
      .json({ success: true, message: 'User logged in successfully', accessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

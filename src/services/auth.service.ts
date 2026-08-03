import bcrypt from 'bcryptjs';
import * as AuthRepository from '../repositories/auth.repository.js';
import * as TokenService from '../services/token.service.js';
import {
  InternalServerError,
  EntityAlreadyExistsError,
  EntityNotFoundError,
  PasswordMismatchError,
} from '../shared/error.js';
import { stringifyID } from '../utils/helper.js';

export const login = async (username: string, password: string) => {
  const user = await AuthRepository.findByUsername(username);
  if (!user) throw new EntityNotFoundError('Username does not exist');

  const isSamePassword = await bcrypt.compare(password, user.password);

  if (!isSamePassword) throw new PasswordMismatchError();

  const accessToken = TokenService.generateAccessToken(stringifyID(user._id));
  const refreshToken = TokenService.generateRefreshToken(stringifyID(user._id));

  return { user, accessToken, refreshToken };
};

export const register = async (username: string, password: string) => {
  const isExistingUser = await AuthRepository.findByUsername(username);
  if (isExistingUser) throw new EntityAlreadyExistsError('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await AuthRepository.createUser(username, hashedPassword);
  if (!newUser) throw new InternalServerError('Failed to create user');

  const accessToken = TokenService.generateAccessToken(stringifyID(newUser._id));
  const refreshToken = TokenService.generateRefreshToken(stringifyID(newUser._id));

  if(!accessToken || !refreshToken) throw new InternalServerError('Failed to create user');

  return { user: newUser, accessToken, refreshToken };
};

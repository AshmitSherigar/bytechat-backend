import bcrypt from 'bcryptjs';
import * as AuthRepository from '../repositories/auth.repository.js';
import * as TokenService from '../services/token.service.js';
import {
  InternalServerError,
  EntityAlreadyExistsError,
  EntityNotFoundError,
  UnauthorizedError,
} from '../shared/error.js';
import { stringifyID } from '../utils/helper.js';

export const login = async (username: string, password: string) => {
  const user = await AuthRepository.findByUsername(username);
  if (!user) throw new EntityNotFoundError('Username does not exist');

  const isSamePassword = await bcrypt.compare(password, user.password);

  if (!isSamePassword) throw new UnauthorizedError('Username or Password do not match');

  const accessToken = TokenService.generateAccessToken(stringifyID(user._id));
  const refreshToken = TokenService.generateRefreshToken(stringifyID(user._id));

  await AuthRepository.addRefreshToken(stringifyID(user._id), refreshToken);

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

  await AuthRepository.addRefreshToken(stringifyID(newUser._id), refreshToken);

  return { user: newUser, accessToken, refreshToken };
};

export const logout = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Authentication required. Please login again');
  const foundUser = await AuthRepository.findByRefreshToken(refreshToken);
  if (!foundUser) throw new UnauthorizedError('Authentication required. Please login again');
  await AuthRepository.removeRefreshToken(stringifyID(foundUser._id), refreshToken);
};

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new UnauthorizedError('Authentication required. Please login again');
  const foundUser = await AuthRepository.findByRefreshToken(refreshToken);
  // Detected refresh token reuse
  if (!foundUser) {
    const { id: hackedID } = TokenService.verifyRefreshToken(refreshToken);
    const hackedUser = await AuthRepository.findByUserID(hackedID);
    if (!hackedUser) throw new UnauthorizedError('Invalid session. Please login again.');
    await AuthRepository.revokeAllRefreshTokens(hackedID);
    throw new UnauthorizedError('Session expired. Please login again');
  }
  const remainingRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
  let id: string;
  try {
    ({ id } = TokenService.verifyRefreshToken(refreshToken));
  } catch (error) {
    // Token existed in DB but failed verification.
    await AuthRepository.replaceRefreshTokens(
      stringifyID(foundUser._id),
      remainingRefreshTokenArray,
    );

    throw error;
  }
  // Token was still valid
  if (id !== stringifyID(foundUser._id)) {
    await AuthRepository.replaceRefreshTokens(
      stringifyID(foundUser._id),
      remainingRefreshTokenArray,
    );

    throw new UnauthorizedError('Invalid session. Please login again.');
  }

  const newAccessToken = TokenService.generateAccessToken(stringifyID(foundUser._id));
  const newRefreshToken = TokenService.generateRefreshToken(stringifyID(foundUser._id));

  const newRefreshTokenArray = [...remainingRefreshTokenArray, newRefreshToken];

  await AuthRepository.replaceRefreshTokens(stringifyID(foundUser._id), newRefreshTokenArray);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

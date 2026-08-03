import User from '../models/auth.model.js';

export const findByUsername = async (username: string) => {
  return User.findOne({ username });
};

export const findByRefreshToken = async (refreshToken: string) => {
  return User.findOne({ refreshToken });
};

export const addRefreshToken = async (id: string, refreshToken: string) => {
  return User.findByIdAndUpdate(id, { $addToSet: { refreshToken } });
};

export const revokeAllRefreshTokens = async (id: string) => {
  return User.findByIdAndUpdate(id, { $set: { refreshToken: [] } });
};

export const removeRefreshToken = async (id: string, refreshToken: string) => {
  return User.findByIdAndUpdate(id, { $pull: { refreshToken } });
};

export const replaceRefreshTokens = async (userId: string, refreshTokens: string[]) => {
  return User.findByIdAndUpdate(userId, {
    $set: { refreshToken: refreshTokens },
  });
};

export const findByUserID = async (id: string) => {
  return User.findById(id);
};

export const createUser = async (username: string, password: string) => {
  return User.create({ username, password });
};

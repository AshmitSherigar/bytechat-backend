import User from '../models/auth.model.js';

export const findByUsername = async (username: string) => {
  const user = await User.findOne({ username });
  return user;
};

export const createUser = async (username: string, password: string) => {
  const user = await User.create({ username, password });
  return user;
};

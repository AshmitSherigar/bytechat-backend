import mongoose from 'mongoose';

export const stringifyID = (userID: mongoose.Types.ObjectId) => {
  return userID.toString();
};

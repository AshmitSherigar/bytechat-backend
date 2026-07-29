import mongoose from 'mongoose';
import env from '../configs/env.js';

const connectDB = async (): Promise<void> => {
  const database_url = env.DATABASE_URL;

  try {
    const conn = await mongoose.connect(database_url);
    console.log(
      `MongoDB Connected Successfully : ${conn.connection.host} | ${conn.connection.name}`,
    );
  } catch (error) {
    console.error(`MongoDB Connection Error : ${error}`);
    process.exit(1);
  }
};

export default connectDB;

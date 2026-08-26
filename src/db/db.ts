import mongoose from 'mongoose';

const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/bytechat';
  try {
    const conn = await mongoose.connect(mongo_uri);
    console.log(
      `Database Successfully Connected: ${conn.connection.host} | ${conn.connection.name}`,
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export default connectDB;

import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/db.js';

dotenv.config();

await connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

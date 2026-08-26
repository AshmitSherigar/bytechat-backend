import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/db.js';
import { router as authRoutes } from './routes/auth.route.js';

dotenv.config();

await connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

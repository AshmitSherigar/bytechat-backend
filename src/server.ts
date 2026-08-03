import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import connectDB from './db/db.js';
import { router as userRoutes } from './routes/auth.route.js';
import { AppError } from './shared/error.js';
import { STATUS_CODES } from './shared/constant.js';

const app = express();

const port = env.PORT;

await connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }
  return res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

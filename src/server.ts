import express from 'express';
import env from './configs/env.js';
import connectDB from './db/db.js';

const app = express();

const port = env.PORT;

await connectDB();

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

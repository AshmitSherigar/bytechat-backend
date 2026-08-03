import dotenv from 'dotenv';
dotenv.config();

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const env = {
  PORT: Number(required('PORT')),
  DATABASE_URL: required('DATABASE_URL'),
  ACCESS_TOKEN_SECRET: required('ACCESS_TOKEN_SECRET'),
  REFRESH_TOKEN_SECRET: required('REFRESH_TOKEN_SECRET'),
  NODE_ENV: required('NODE_ENV'),
} as const;

export default env;

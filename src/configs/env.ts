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
} as const;

export default env;

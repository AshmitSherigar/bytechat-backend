import env from './env.js';

const cookieConfig = {
  secure: env.NODE_ENV === 'production',
  sameSite: true,
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export default cookieConfig;

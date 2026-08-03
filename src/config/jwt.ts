const jwtConfig = {
  accessConfig: {
    expiresIn: '30m',
  },
  refreshConfig: {
    expiresIn: '30d',
  },
} as const;

export default jwtConfig;

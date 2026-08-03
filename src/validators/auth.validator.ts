import * as z from 'zod';

export const userSchema = z.object({
  username: z.string().max(12),
  password: z.string().max(10),
});

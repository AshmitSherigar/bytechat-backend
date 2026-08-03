import * as z from 'zod';

export const userSchema = z.object({
  username: z.string().max(12).min(1),
  password: z.string().max(10).min(5),
});

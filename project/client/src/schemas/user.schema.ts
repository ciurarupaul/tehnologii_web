import z from 'zod';

export const userSchema = z.object({
  id: z.string(),
  betterAuthId: z.string(),
  role: z.enum(['student', 'professor', 'admin']),
  firstName: z.string(),
});
export type User = z.infer<typeof userSchema>;

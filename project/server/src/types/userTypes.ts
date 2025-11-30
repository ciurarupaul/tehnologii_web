import z from 'zod';

export const UserRolesEnum = ['student', 'professor', 'admin'] as const;

export const AppUserSchema = z.object({
  id: z.string().uuid(),
  betterAuthId: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  role: z.enum(UserRolesEnum).default('student'),
  // timestamps
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

export type UserRoles = z.infer<typeof AppUserSchema>['role'];
export type AppUser = z.infer<typeof AppUserSchema>;

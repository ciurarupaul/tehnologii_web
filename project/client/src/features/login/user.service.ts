import type { User } from '@/schemas/user.schema';

import { userSchema } from '@/schemas/user.schema';

import { fetchAndValidate } from './user.function';

export async function fetchCurrentUser({
  headers,
}: {
  headers: Headers
}): Promise<User | null> {
  return fetchAndValidate({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/whoami`,
    options: {
      headers,
      schema: userSchema,
    },
  });
}

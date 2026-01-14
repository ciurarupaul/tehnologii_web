import type { User } from '@/types/schemas/user.schema';

import { userSchema } from '@/types/schemas/user.schema';

import { fetchAndValidate } from './user.utils';

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

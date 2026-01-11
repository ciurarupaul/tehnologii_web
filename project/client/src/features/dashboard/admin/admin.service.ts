import type { UserList } from '@/schemas/user.schema';

import { fetchAndValidate } from '@/features/login/user.function';
import { userListSchema } from '@/schemas/user.schema';

type Props = {
  headers: Headers
};

export async function fetchAllUsers({ headers }: Readonly<Props>): Promise<UserList> {
  const users = await fetchAndValidate({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/users`,
    options: {
      headers,
      schema: userListSchema,
    },
  });

  if (!users)
    return [];
  return users;
}

export async function updateUserRole(userId: string, role: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/users/${userId}/role`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role }),
      },
    );

    return response.ok;
  }
  catch (error) {
    console.error('Error updating role:', error);
    return false;
  }
}

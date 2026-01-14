'use client';

import type { ReactNode } from 'react';

import type { User } from '@/types/schemas/user.schema';

import { UserProvider } from '@/data/UserContext';

type Props = {
  children: ReactNode
  user: User | null
};

export default function Providers({ children, user }: Readonly<Props>) {
  return (
    <UserProvider initialUser={user}>
      {children}
    </UserProvider>
  );
}

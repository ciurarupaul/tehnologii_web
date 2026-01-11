'use client';

import type { ReactNode } from 'react';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { User } from '@/schemas/user.schema';

import { authClient } from '@/lib/betterAuth';

type UserContextProps = {
  user: User | null
  setUser: (user: User | null) => void
  login: (provider: 'google' | 'github') => void
  logout: () => void
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  async function login(provider: 'google' | 'github') {
    await authClient.signIn.social({
      provider,
      callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
      errorCallbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/error`,
      disableRedirect: false,
    });
  }

  async function logout() {
    try {
      await authClient.signOut();
      setUser(null); // optimistic ui update
      window.location.href = '/login';
    }
    catch (err) {
      console.error('Logout failed:', err);
      setUser(null);
      window.location.href = '/login';
    }
  }

  const contextValue: UserContextProps = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user, setUser, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

function useUserContext(): UserContextProps {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}

export { UserProvider, useUserContext };

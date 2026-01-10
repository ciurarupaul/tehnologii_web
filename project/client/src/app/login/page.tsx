'use client';

import { redirect } from 'next/navigation';

import { useUserContext } from '@/data/UserContext';

export default function Page() {
  const { login, user } = useUserContext();

  if (user) {
    redirect('/');
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Google</button>
    </div>
  );
}

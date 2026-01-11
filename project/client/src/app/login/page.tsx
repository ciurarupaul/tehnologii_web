'use client';

import Link from 'next/link';

import { useUserContext } from '@/data/UserContext';

export default function Page() {
  const { login, user } = useUserContext();

  if (user) {
    return (
      <div>
        <p>Already logged in.</p>
        <Link href='/dashboard'>Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => login('google')}>Google</button>
      <button onClick={() => login('github')}>Github</button>
    </div>
  );
}

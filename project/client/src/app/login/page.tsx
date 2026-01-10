'use client';

import { useUserContext } from '@/data/UserContext';

export default function Page() {
  const { login } = useUserContext();
  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Google</button>
    </div>
  );
}

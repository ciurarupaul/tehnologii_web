'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useUserContext } from '@/data/UserContext';
import NewActivityForm from '@/features/dashboard/professor/NewActivityForm';

export default function NewActivityPage() {
  const { user } = useUserContext();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'professor' && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setIsChecking(false);
  }, [user, router]);

  if (isChecking) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }

  return <NewActivityForm />;
}

'use client';

import { redirect } from 'next/navigation';

import { useUserContext } from '@/data/UserContext';
import ProfessorDashboard from '@/features/dashboard/ProfessorDashboard';
import StudentDashboard from '@/features/dashboard/StudentDashboard';

export default function Page() {
  const { user } = useUserContext();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      {user.role === 'student' && <StudentDashboard />}
      {user.role === 'professor' && <ProfessorDashboard />}
    </>
  );
}

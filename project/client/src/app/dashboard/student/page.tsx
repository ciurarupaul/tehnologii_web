import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { canAccessRole } from '@/features/dashboard/dashboard.functions';
import StudentDashboard from '@/features/dashboard/StudentDashboard';
import { fetchCurrentUser } from '@/features/login/user.service';

export default async function StudentDashboardPage() {
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  if (!canAccessRole(user.role, 'student')) {
    redirect('/dashboard');
  }

  return <StudentDashboard />;
}

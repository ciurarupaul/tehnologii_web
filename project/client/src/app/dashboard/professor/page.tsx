import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { canAccessRole } from '@/features/dashboard/dashboard.functions';
import ProfessorDashboard from '@/features/dashboard/ProfessorDashboard';
import { fetchCurrentUser } from '@/features/login/user.service';

export default async function ProfessorDashboardPage() {
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  if (!canAccessRole(user.role, 'professor')) {
    redirect('/dashboard');
  }

  return <ProfessorDashboard />;
}

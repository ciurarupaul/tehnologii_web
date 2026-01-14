import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { canAccessRole } from '@/features/dashboard/dashboard.functions';
import ProfessorDashboard from '@/features/dashboard/professor/ProfessorDashboard';
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

/*
  required features for professors
    - pot vedea activitatile definite de ei
    - pot CRUD activitati
    - pe pagina activitatii pot vedea feedback ul primit
    - generare cod unic pentru activitate

    /activity/new - create new activity
    /activity/:id - edit, delete, see results
    or /activity/results - see results
*/

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminDashboard from '@/features/dashboard/admin/AdminDashboard';
import { canAccessRole } from '@/features/dashboard/dashboard.functions';
import { fetchCurrentUser } from '@/features/login/user.service';

export default async function AdminDashboardPage() {
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  if (!canAccessRole(user.role, 'admin')) {
    redirect(`/dashboard/${user.role}`);
  }

  return <AdminDashboard headers={headersList} />;
}

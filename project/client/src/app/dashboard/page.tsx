import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { fetchCurrentUser } from '@/features/login/user.service';

export default async function DashboardPage() {
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  redirect(`/dashboard/${user.role}`);
}

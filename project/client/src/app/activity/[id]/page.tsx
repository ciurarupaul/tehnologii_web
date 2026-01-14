import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { canAccessRole } from '@/features/dashboard/dashboard.functions';
import ActivityDetail from '@/features/dashboard/professor/ActivityDetail';
import { fetchActivity, fetchActivityFeedback } from '@/features/dashboard/professor/professor.service';
import { fetchCurrentUser } from '@/features/login/user.service';

type Params = {
  params: Promise<{ id: string }>
};

export default async function ActivityPage({ params }: Params) {
  const { id } = await params;
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  if (!canAccessRole(user.role, 'professor')) {
    redirect(`/dashboard/${user.role}`);
  }

  const activity = await fetchActivity({ headers: headersList, id });

  if (!activity) {
    notFound();
  }

  const feedback = await fetchActivityFeedback({ headers: headersList, id });

  return <ActivityDetail activity={activity} feedback={feedback} />;
}

import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import ActivityFeedback from '@/features/dashboard/student/ActivityFeedback';
import { fetchCurrentUser } from '@/features/login/user.service';
import { fetchActivity } from '@/features/dashboard/professor/professor.service';

type Params = {
  params: Promise<{ id: string }>
};

export default async function ActivityFeedbackPage({ params }: Params) {
  const { id } = await params;
  const headersList = await headers();
  const user = await fetchCurrentUser({ headers: headersList });

  if (!user) {
    redirect('/login');
  }

  const activity = await fetchActivity({ headers: headersList, id });

  if (!activity) {
    notFound();
  }

  return <ActivityFeedback activity={activity} />;
}

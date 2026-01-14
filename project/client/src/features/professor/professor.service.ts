import type { ActivityList } from '@/types/schemas/activity.schema';

import { fetchAndValidate } from '@/features/login/user.utils';
import { activityListSchema } from '@/types/schemas/activity.schema';

export async function fetchMyActivities({
  headers,
  professorId,
}: {
  headers: Headers
  professorId: string
}): Promise<ActivityList> {
  const activities = await fetchAndValidate({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/${professorId}/activities`,
    options: {
      headers,
      schema: activityListSchema,
      cache: 'no-store',
    },
  });

  return activities ?? [];
}

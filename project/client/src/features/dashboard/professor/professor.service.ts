import type { Activity, ActivityList } from '@/types/schemas/activity.schema';

import { fetchAndValidate } from '@/features/login/user.utils';
import { activityListSchema, activitySchema } from '@/types/schemas/activity.schema';

export async function fetchMyActivities({
  headers,
}: {
  headers: Headers
}): Promise<ActivityList> {
  const activities = await fetchAndValidate({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/activities`,
    options: {
      headers,
      schema: activityListSchema,
      cache: 'no-store',
    },
  });

  return activities ?? [];
}

export async function fetchActivity({
  headers,
  id,
}: {
  headers: Headers
  id: string
}): Promise<Activity | null> {
  const activity = await fetchAndValidate({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/activities/${id}`,
    options: {
      headers,
      schema: activitySchema,
      cache: 'no-store',
    },
  });

  return activity;
}

type CreateActivityInput = {
  title: string
  description: string
  startTime: string
  endTime: string
};

export async function createActivity(data: CreateActivityInput): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create activity');
  }

  const result = await response.json();
  return result.data;
}

type UpdateActivityInput = {
  title?: string
  description?: string
  startTime?: string
  endTime?: string
};

export async function updateActivity(id: string, data: UpdateActivityInput): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/activities/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update activity');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteActivity(id: string): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/professor/activities/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete activity');
  }
}

import { z } from 'zod';

import type { Activity } from '@/types/schemas/activity.schema';

import { activitySchema } from '@/types/schemas/activity.schema';

export async function getMyActivities(): Promise<Activity[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/activities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }

  const result = await response.json();
  const validated = z.array(activitySchema).safeParse(result.data);

  if (!validated.success) {
    throw new Error('Invalid activities data received');
  }

  return validated.data;
}

type JoinActivityInput = {
  accessCode: string
};

export async function joinActivity(data: JoinActivityInput): Promise<Activity> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to join activity');
  }

  const result = await response.json();
  const validated = activitySchema.safeParse(result.data);

  if (!validated.success) {
    throw new Error('Invalid activity data received');
  }

  return validated.data;
}

type SubmitFeedbackInput = {
  activityId: string
  type: 'smiley' | 'frowny' | 'surprised' | 'confused'
  comment?: string
};

export async function submitFeedback(data: SubmitFeedbackInput): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/student/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to submit feedback');
  }
}

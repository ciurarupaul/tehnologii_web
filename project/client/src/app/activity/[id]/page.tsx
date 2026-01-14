'use client';

import { useParams } from 'next/navigation';

export default function ActivityPage() {
  const params = useParams();
  const activityId = params.id as string;

  return (
    <div>
      <h1>Activity Details</h1>
      <p>
        Activity ID:
        {activityId}
      </p>
      <p>This page will display activity details and feedback management.</p>
    </div>
  );
}

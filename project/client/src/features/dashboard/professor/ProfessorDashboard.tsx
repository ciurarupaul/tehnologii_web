'use client';

import { Edit2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { ActivityList } from '@/types/schemas/activity.schema';

import { deleteActivity } from '@/features/dashboard/professor/professor.service';

import styles from './ProfessorDashboard.module.scss';

type ProfessorDashboardProps = {
  activities: ActivityList
};

export default function ProfessorDashboard({ activities }: ProfessorDashboardProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteActivity(id);
      router.refresh();
    }
    catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete activity');
      setDeletingId(null);
    }
  }

  return (
    <div className={styles.prof}>
      <div className={styles.prof__header}>
        <h2>My activities</h2>
        <Link href='/activity/new'>
          New
          <Plus width={18} height={18} />
        </Link>
      </div>

      {activities.length === 0
        ? (
          <p className={styles.prof__empty}>
            No activities yet. Create your first activity!
          </p>
        )
        : (
          <div className={styles.prof__grid}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={styles.prof__card}
              >
                <div className={styles.prof__card__header}>
                  <h3>{activity.title}</h3>
                  <span className={styles.prof__card__code}>{activity.accessCode}</span>
                </div>
                <p className={styles.prof__card__description}>{activity.description}</p>
                <div className={styles.prof__card__times}>
                  <span>
                    {new Date(activity.startTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span>→</span>
                  <span>
                    {new Date(activity.endTime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className={styles.prof__card__actions}>
                  <Link
                    href={`/activity/${activity.id}`}
                    className={styles.prof__card__view}
                  >
                    View details
                  </Link>
                  <Link
                    href={`/activity/${activity.id}/edit`}
                    className={styles.prof__card__edit}
                    title='Edit activity'
                  >
                    <Edit2 width={16} height={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(activity.id, activity.title)}
                    className={styles.prof__card__delete}
                    disabled={deletingId === activity.id}
                    title='Delete activity'
                    type='button'
                  >
                    <Trash2 width={16} height={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

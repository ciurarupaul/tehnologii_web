'use client';

import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Activity } from '@/types/schemas/activity.schema';

import { getActivityStatus, getActivityStatusColor, getActivityStatusLabel } from './dashboard.utils';
import { getMyActivities, joinActivity } from './student/student.service';
import styles from './student/StudentDashboard.module.scss';

export default function StudentDashboard() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await getMyActivities();
        setActivities(data);
      }
      catch (err) {
        console.error('Failed to load activities:', err);
      }
      finally {
        setIsLoading(false);
      }
    }

    loadActivities();
  }, []);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setIsJoining(true);
    setError(null);

    try {
      const activity = await joinActivity({ accessCode: accessCode.toUpperCase() });
      // Redirect to feedback page
      router.push(`/activity/${activity.id}/feedback`);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join activity');
      setIsJoining(false);
    }
  }

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.student}>
      <div className={styles.student__header}>
        <h2>Student Dashboard</h2>
        <p>Join activities or view your enrolled activities</p>
      </div>

      <div className={styles.student__card}>
        <form onSubmit={handleJoin} className={styles.student__form}>
          {error && (
            <div className={styles.student__error}>
              {error}
            </div>
          )}

          <div className={styles.student__field}>
            <label htmlFor='accessCode'>Access Code</label>
            <input
              type='text'
              id='accessCode'
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder='Enter 6-character code'
              maxLength={6}
              required
              disabled={isJoining}
              className={styles.student__input}
            />
          </div>

          <button
            type='submit'
            disabled={isJoining || accessCode.length !== 6}
            className={styles.student__submit}
          >
            {isJoining ? 'Joining...' : 'Join Activity'}
            <LogIn width={18} height={18} />
          </button>
        </form>
      </div>

      {/* My Activities Section */}
      <div className={styles.student__activities}>
        <h3>My Activities</h3>
        {isLoading
          ? (
            <p className={styles.student__loading}>Loading activities...</p>
          )
          : activities.length === 0
            ? (
              <p className={styles.student__empty}>
                You haven't joined any activities yet. Use the form above to join one!
              </p>
            )
            : (
              <div className={styles.student__grid}>
                {activities.map((activity) => {
                  const status = getActivityStatus(activity.startTime, activity.endTime);
                  const statusColor = getActivityStatusColor(status);
                  const statusLabel = getActivityStatusLabel(status);
                  const isActive = status === 'active';

                  return (
                    <Link
                      key={activity.id}
                      href={isActive ? `/activity/${activity.id}/feedback` : '#'}
                      className={`${styles.student__card__item} ${!isActive ? styles['student__card__item--disabled'] : ''}`}
                    >
                      <div className={styles.student__card__header}>
                        <h4>{activity.title}</h4>
                        <span className={`${styles.student__card__status} ${styles[`student__card__status--${statusColor}`]}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className={styles.student__card__description}>{activity.description}</p>
                      <div className={styles.student__card__times}>
                        <div className={styles.student__card__time}>
                          <span className={styles.student__card__time__label}>Starts:</span>
                          <span>{formatDateTime(activity.startTime)}</span>
                        </div>
                        <div className={styles.student__card__time}>
                          <span className={styles.student__card__time__label}>Ends:</span>
                          <span>{formatDateTime(activity.endTime)}</span>
                        </div>
                      </div>
                      {isActive && (
                        <div className={styles.student__card__prompt}>
                          Click to provide feedback
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
      </div>
    </div>
  );
}

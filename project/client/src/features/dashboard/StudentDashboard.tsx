'use client';

import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { joinActivity } from './student/student.service';
import styles from './student/StudentDashboard.module.scss';

export default function StudentDashboard() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className={styles.student}>
      <div className={styles.student__header}>
        <h2>Join Activity</h2>
        <p>Enter the access code provided by your professor to join an activity</p>
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
    </div>
  );
}

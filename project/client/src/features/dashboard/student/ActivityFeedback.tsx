'use client';

import { CircleQuestionMark, Frown, Meh, Smile } from 'lucide-react';
import { useState } from 'react';

import type { Activity } from '@/types/schemas/activity.schema';

import styles from './ActivityFeedback.module.scss';
import { submitFeedback } from './student.service';

type ActivityFeedbackProps = {
  activity: Activity
};

type FeedbackType = 'smiley' | 'frowny' | 'surprised' | 'confused';

export default function ActivityFeedback({ activity }: ActivityFeedbackProps) {
  const [submittingType, setSubmittingType] = useState<FeedbackType | null>(null);
  const [feedbackCount, setFeedbackCount] = useState(0);

  async function handleFeedback(type: FeedbackType) {
    setSubmittingType(type);

    try {
      await submitFeedback({ activityId: activity.id, type });
      setFeedbackCount((prev) => prev + 1);

      // Show brief success feedback
      setTimeout(() => {
        setSubmittingType(null);
      }, 300);
    }
    catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit feedback');
      setSubmittingType(null);
    }
  }

  const feedbackOptions = [
    { type: 'smiley' as FeedbackType, icon: Smile, label: 'Happy', color: 'green' },
    { type: 'frowny' as FeedbackType, icon: Frown, label: 'Sad', color: 'red' },
    { type: 'surprised' as FeedbackType, icon: CircleQuestionMark, label: 'Surprised', color: 'warning' },
    { type: 'confused' as FeedbackType, icon: Meh, label: 'Confused', color: 'neutral' },
  ];

  return (
    <div className={styles.feedback}>
      <div className={styles.feedback__header}>
        <div>
          <h2>{activity.title}</h2>
          <p>{activity.description}</p>
        </div>
        <div className={styles.feedback__count}>
          <span>
            Feedback submitted:
            {feedbackCount}
          </span>
        </div>
      </div>

      <div className={styles.feedback__grid}>
        {feedbackOptions.map(({ type, icon: Icon, label, color }) => (
          <button
            key={type}
            onClick={() => handleFeedback(type)}
            disabled={submittingType !== null}
            className={`${styles.feedback__button} ${styles[`feedback__button--${color}`]} ${
              submittingType === type ? styles['feedback__button--active'] : ''
            }`}
            type='button'
          >
            <Icon size={64} strokeWidth={1.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className={styles.feedback__info}>
        <p>Tap any emotion to send feedback to your professor. You can submit as many times as you want!</p>
      </div>
    </div>
  );
}

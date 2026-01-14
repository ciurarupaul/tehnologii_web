'use client';

import { AlertCircle, ArrowLeft, Frown, Meh, Smile } from 'lucide-react';
import Link from 'next/link';

import type { Activity } from '@/types/schemas/activity.schema';
import type { FeedbackList } from '@/types/schemas/feedback.schema';

import styles from './ActivityDetail.module.scss';

type ActivityDetailProps = {
  activity: Activity
  feedback: FeedbackList
};

export default function ActivityDetail({ activity, feedback }: ActivityDetailProps) {
  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.detail}>
      <div className={styles.detail__header}>
        <Link href='/dashboard/professor' className={styles.detail__back}>
          <ArrowLeft width={18} height={18} />
          Back
        </Link>
        <h2>Activity Details</h2>
      </div>

      <div className={styles.detail__content}>
        <div className={styles.detail__section}>
          <label>Activity Title</label>
          <div className={styles.detail__value}>{activity.title}</div>
        </div>

        <div className={styles.detail__section}>
          <label>Access Code</label>
          <div className={styles.detail__code}>{activity.accessCode}</div>
        </div>

        <div className={styles.detail__section}>
          <label>Description</label>
          <div className={styles.detail__value}>{activity.description}</div>
        </div>

        <div className={styles.detail__row}>
          <div className={styles.detail__section}>
            <label>Start Time</label>
            <div className={styles.detail__value}>{formatDateTime(activity.startTime)}</div>
          </div>

          <div className={styles.detail__section}>
            <label>End Time</label>
            <div className={styles.detail__value}>{formatDateTime(activity.endTime)}</div>
          </div>
        </div>

        <div className={styles.detail__section}>
          <label>Created</label>
          <div className={styles.detail__value}>
            {new Date(activity.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className={styles.detail__feedback}>
        <h3>Student Feedback</h3>

        {feedback.length === 0
          ? (
            <p className={styles.detail__empty}>No feedback received yet.</p>
          )
          : (
            <>
              <div className={styles.detail__stats}>
                {[
                  { type: 'smiley', icon: Smile, label: 'Happy', color: 'green' },
                  { type: 'frowny', icon: Frown, label: 'Sad', color: 'red' },
                  { type: 'surprised', icon: AlertCircle, label: 'Surprised', color: 'warning' },
                  { type: 'confused', icon: Meh, label: 'Confused', color: 'neutral' },
                ].map(({ type, icon: Icon, label, color }) => {
                  const count = feedback.filter((f) => f.type === type).length;
                  const percentage = ((count / feedback.length) * 100).toFixed(0);

                  return (
                    <div key={type} className={`${styles.detail__stat} ${styles[`detail__stat--${color}`]}`}>
                      <Icon size={32} strokeWidth={1.5} />
                      <div className={styles.detail__stat__info}>
                        <span className={styles.detail__stat__label}>{label}</span>
                        <span className={styles.detail__stat__count}>
                          {count}
                          {' '}
                          (
                          {percentage}
                          %)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.detail__timeline}>
                <h4>Feedback Timeline</h4>
                <div className={styles.detail__timeline__list}>
                  {feedback.map((item) => {
                    const iconMap = {
                      smiley: Smile,
                      frowny: Frown,
                      surprised: AlertCircle,
                      confused: Meh,
                    };
                    const Icon = iconMap[item.type];

                    return (
                      <div key={item.id} className={styles.detail__timeline__item}>
                        <div className={`${styles.detail__timeline__icon} ${styles[`detail__timeline__icon--${item.type}`]}`}>
                          <Icon size={20} />
                        </div>
                        <div className={styles.detail__timeline__content}>
                          <span className={styles.detail__timeline__time}>
                            {new Date(item.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                          {item.comment && (
                            <p className={styles.detail__timeline__comment}>{item.comment}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Activity } from '@/types/schemas/activity.schema';

import styles from './NewActivityForm.module.scss';
import { updateActivity } from './professor.service';

type EditActivityFormProps = {
  activity: Activity
};

export default function EditActivityForm({ activity }: EditActivityFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    // Convert ISO strings to datetime-local format (YYYY-MM-DDTHH:mm)
    const formatDateForInput = (isoString: string) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setFormData({
      title: activity.title,
      description: activity.description,
      startTime: formatDateForInput(activity.startTime),
      endTime: formatDateForInput(activity.endTime),
    });
  }, [activity]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateActivity(activity.id, formData);
      // Success - redirect to dashboard
      router.push('/dashboard/professor');
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <Link href='/dashboard/professor' className={styles.form__back}>
          <ArrowLeft width={18} height={18} />
          Back
        </Link>
        <h2>Edit activity</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form__content}>
        {error && (
          <div className={styles.form__error}>
            {error}
          </div>
        )}

        <div className={styles.form__field}>
          <label htmlFor='title'>Activity title *</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='e.g., Introduction to React'
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.form__field}>
          <label htmlFor='description'>Description *</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Describe what this activity will cover...'
            rows={4}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.form__row}>
          <div className={styles.form__field}>
            <label htmlFor='startTime'>Start time *</label>
            <input
              type='datetime-local'
              id='startTime'
              name='startTime'
              value={formData.startTime}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.form__field}>
            <label htmlFor='endTime'>End time *</label>
            <input
              type='datetime-local'
              id='endTime'
              name='endTime'
              value={formData.endTime}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={styles.form__actions}>
          <Link href='/dashboard/professor' className={styles.form__cancel}>
            Cancel
          </Link>
          <button type='submit' disabled={isSubmitting} className={styles.form__submit}>
            {isSubmitting ? 'Saving...' : 'Save changes'}
            <Save width={18} height={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

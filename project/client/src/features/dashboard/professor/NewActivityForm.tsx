'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './NewActivityForm.module.scss';
import { createActivity } from './professor.service';

export default function NewActivityForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createActivity(formData);
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
        <h2>Create new activity</h2>
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
            {isSubmitting ? 'Creating...' : 'Create activity'}
            <Save width={18} height={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

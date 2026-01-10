'use client';

import { useRouter } from 'next/navigation';

import styles from '../Dashboard.module.scss';
import { updateUserRole } from './admin.service';

type Props = {
  userId: string
  currentRole: string
};

export default function UserRoleActions({ userId, currentRole }: Props) {
  const router = useRouter();

  async function handleUpdateRole(newRole: string) {
    const success = await updateUserRole(userId, newRole);

    if (success) {
      router.refresh();
    }
    else {
      console.error('Failed to update role');
    }
  }

  return (
    <div className={styles.admin__item__buttons}>
      <button
        onClick={() => handleUpdateRole('student')}
        disabled={currentRole === 'student'}
      >
        Make student
      </button>
      <button
        onClick={() => handleUpdateRole('professor')}
        disabled={currentRole === 'professor'}
      >
        Make professor
      </button>
      <button
        onClick={() => handleUpdateRole('admin')}
        disabled={currentRole === 'admin'}
      >
        Make admin
      </button>
    </div>
  );
}

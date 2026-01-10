'use client';

import { useUserContext } from '@/data/UserContext';

import styles from './Header.module.scss';

export default function Header() {
  const { user } = useUserContext();

  return (
    <div className={styles.header}>
      Salut,
      {' '}
      {user?.firstName}
      {' '}
      (
      {user?.role}
      )
    </div>
  );
}

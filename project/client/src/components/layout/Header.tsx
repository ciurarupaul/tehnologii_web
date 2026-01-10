'use client';

import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUserContext } from '@/data/UserContext';
import { canAccessRole } from '@/features/dashboard/dashboard.functions';

import styles from './Header.module.scss';

export default function Header() {
  const { user, logout } = useUserContext();
  const pathname = usePathname();

  const dashboards = [
    { name: 'Student', path: '/dashboard/student', role: 'student' },
    { name: 'Profesor', path: '/dashboard/professor', role: 'professor' },
    { name: 'Admin', path: '/dashboard/admin', role: 'admin' },
  ];

  return (
    <div className={styles.header}>
      {user
        ? (
          <div className={styles['header__container--authenticated']}>
            <div className={styles.header__user}>
              Salut,
              {' '}
              {user.firstName}
              {' '}
              (
              {user.role}
              )
            </div>

            <nav className={styles.header__nav}>
              {dashboards
                .filter((dash) => canAccessRole(user.role, dash.role))
                .map((dash) => (
                  <Link
                    key={dash.path}
                    href={dash.path}
                    className={`${styles.header__nav__button} ${pathname === dash.path ? styles.active : ''}`}
                  >
                    {dash.name}
                  </Link>
                ))}
            </nav>

            <button onClick={logout} className={styles.header__logout}>
              <LogOut width={16} height={16} />
              Logout
            </button>
          </div>
        )
        : (
          <Link href='/login' className={styles['header__container--anon']}>
            <LogIn />
            Login
          </Link>
        )}
    </div>
  );
}

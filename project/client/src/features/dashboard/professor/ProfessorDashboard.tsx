import { Plus } from 'lucide-react';
import Link from 'next/link';

import styles from './ProfessorDashboard.module.scss';

export default function ProfessorDashboard() {
  return (
    <div className={styles.prof}>
      <div className={styles.prof__header}>
        <h2>My activities</h2>
        <Link href='/activity/new'>
          New
          <Plus width={18} height={18} />
        </Link>
      </div>

      <div>table of activities here</div>
    </div>
  );
}

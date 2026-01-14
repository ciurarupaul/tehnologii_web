import styles from './AdminDashboard.module.scss';
import { fetchAllUsers } from './adminDashboard.service';
import UserRoleActions from './UserRoleActions';

type Props = {
  headers: Headers
};

export default async function AdminDashboard({ headers }: Readonly<Props>) {
  const users = await fetchAllUsers({ headers }) ?? [];

  return (
    <div className={styles.admin}>
      {users.map((user) => (
        <div key={user.id} className={styles.admin__item}>
          <span>
            {`${user.id}\t-\t${user.firstName}`}
          </span>
          <UserRoleActions userId={user.id} currentRole={user.role} />
        </div>
      ))}
    </div>
  );
}

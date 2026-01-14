export type ActivityStatus = 'upcoming' | 'active' | 'ended';

export function getActivityStatus(startTime: string, endTime: string): ActivityStatus {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    return 'upcoming';
  }
  if (now > end) {
    return 'ended';
  }
  return 'active';
}

export function getActivityStatusLabel(status: ActivityStatus): string {
  const labels = {
    upcoming: 'Upcoming',
    active: 'Active',
    ended: 'Ended',
  };
  return labels[status];
}

export function getActivityStatusColor(status: ActivityStatus): string {
  const colors = {
    upcoming: 'neutral',
    active: 'success',
    ended: 'error',
  };
  return colors[status];
}

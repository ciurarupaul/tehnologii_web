import Activity from '@/models/activityModel';
import AppUser from '@/models/appUserModel';
import Feedback from '@/models/feedbackModel';

export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  const users = await seedUsers();
  const activities = await seedActivities(users);

  await seedFeedback(activities, users);

  console.log('✅ Database seeded successfully');
}

async function seedUsers() {
  const userData = [
    { betterAuthId: 'seed-admin-1', firstName: 'Admin', role: 'admin' },
    { betterAuthId: 'seed-prof-1', firstName: 'John', role: 'professor' },
    { betterAuthId: 'seed-prof-2', firstName: 'Jane', role: 'professor' },
    { betterAuthId: 'seed-student-1', firstName: 'Alice', role: 'student' },
    { betterAuthId: 'seed-student-2', firstName: 'Bob', role: 'student' },
  ];

  const users = [];
  for (const data of userData) {
    const [user] = await AppUser.findOrCreate({
      where: { betterAuthId: data.betterAuthId },
      defaults: data,
    });
    users.push(user);
  }

  return users;
}

async function seedActivities(users: any[]) {
  const professor = users.find((u) => u.role === 'professor');

  const activityData = [
    {
      professorId: professor.id,
      title: 'Introduction to React',
      description: 'First lecture on React basics',
      accessCode: 'REACT101',
      startTime: new Date('2026-01-15T10:00:00'),
      endTime: new Date('2026-01-15T12:00:00'),
    },
    {
      professorId: professor.id,
      title: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript',
      accessCode: 'TS202',
      startTime: new Date('2026-01-16T14:00:00'),
      endTime: new Date('2026-01-16T16:00:00'),
    },
  ];

  const activities = [];
  for (const data of activityData) {
    const [activity] = await Activity.findOrCreate({
      where: { accessCode: data.accessCode },
      defaults: data,
    });
    activities.push(activity);
  }

  return activities;
}

async function seedFeedback(activities: any[], users: any[]) {
  const types = ['smiley', 'frowny', 'surprised', 'confused'];
  const students = users.filter((u) => u.role === 'student');

  for (const activity of activities) {
    for (let i = 0; i < 10; i++) {
      const student = students[i % students.length];
      await Feedback.create({
        activityId: activity.id,
        studentId: student.id,
        type: types[Math.floor(Math.random() * types.length)],
        comment: i % 3 === 0 ? 'Great lecture!' : null,
      });
    }
  }
}

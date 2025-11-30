import Activity from './activityModel';
import AppUser from './appUserModel';
import Feedback from './feedbackModel';

// link professor to activity
Activity.belongsTo(AppUser, {
  as: 'professor',
  foreignKey: 'professorId',
});

// link student to activity
Activity.belongsToMany(AppUser, {
  through: 'activity_students',
  as: 'students',
  foreignKey: 'activityId',
  otherKey: 'studentId',
});

AppUser.belongsToMany(Activity, {
  through: 'activity_students',
  as: 'enrolledActivities',
  foreignKey: 'studentId',
  otherKey: 'activityId',
});

// link student to feedback
Feedback.belongsTo(AppUser, {
  as: 'student',
  foreignKey: 'studentId',
});
AppUser.hasMany(Feedback, {
  as: 'feedbacks',
  foreignKey: 'studentId',
});

// link feedback to activity
Feedback.belongsTo(Activity, {
  as: 'activity',
  foreignKey: 'activityId',
});
Activity.hasMany(Feedback, {
  as: 'feedbacks',
  foreignKey: 'activityId',
});

const models = {
  AppUser,
  Activity,
  Feedback,
};

export default models;

import { DataTypes } from 'sequelize';

import database from '@/core/database';

const Feedback = database.define(
  'Feedback',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    activityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
      allowNull: false,
      defaultValue: 'smiley',
    },
    comment: DataTypes.TEXT,
  },
  {
    tableName: 'feedbacks',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  },
);

export default Feedback;

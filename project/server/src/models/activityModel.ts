import type { Model } from 'sequelize';

import { DataTypes } from 'sequelize';

import database from '@/core/database';

type ActivityInstance = {
  startTime: Date
  endTime: Date
} & Model;

const Activity = database.define(
  'Activity',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    professorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(Date.now() + 60 * 60 * 1000),
      allowNull: false,
    },
    accessCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'activities',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    validate: {
      endTimeAfterStartTime(this: ActivityInstance) {
        if (this.endTime <= this.startTime) {
          throw new Error('End time must be after start time.');
        }
      },
    },
  },
);

export default Activity;

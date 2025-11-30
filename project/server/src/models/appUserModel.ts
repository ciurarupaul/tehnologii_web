import { DataTypes } from 'sequelize';

import database from '@/core/database';

const AppUser = database.define(
  'AppUser',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    betterAuthId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('student', 'professor', 'admin'),
      defaultValue: 'student',
      allowNull: false,
    },
  },
  {
    tableName: 'app_users',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  },
);

export default AppUser;

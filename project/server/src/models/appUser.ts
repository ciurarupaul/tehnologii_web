import { DataTypes } from 'sequelize';

import database from '@/core/database';

const AppUser = database.define(
  'AppUser',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM('student', 'professor', 'admin'),
      defaultValue: 'student',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
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

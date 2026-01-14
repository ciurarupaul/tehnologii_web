import path from 'node:path';
import { Sequelize } from 'sequelize';

import config from './config';

const isDevelopment = config.nodeEnv === 'development';

/* eslint-disable no-console */
const sqliteLogging = (msg: string) => console.log(msg);
/* eslint-enable no-console */

// Use SQLite for development, PostgreSQL for production
const database = isDevelopment
  ? new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'database', 'database.db'),
    logging: sqliteLogging,
  })
  : new Sequelize(config.databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Render uses self-signed certificates
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

export default database;

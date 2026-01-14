import { seedDatabase } from '@/seeds';

import app from './app';
import config from './config';
import database from './database';

import '@/models';

/* eslint-disable no-console */

async function initDb() {
  try {
    if (config.nodeEnv === 'development') {
      // SQLite: Disable foreign keys during sync
      await database.query('PRAGMA foreign_keys = OFF');
      await database.sync({ force: true });
      console.log('Database synced (development mode)');
      
      // Re-enable foreign keys and seed
      await database.query('PRAGMA foreign_keys = ON');
      await seedDatabase();
    }
    else {
      // Production: Only verify connection, use migrations for schema
      await database.authenticate();
      console.log('Database connection verified');
    }

    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}...`);
    });
  }
  catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

initDb();

import { seedDatabase } from '@/seeds';

import app from './app';
import config from './config';
import database from './database';

import '@/models';

/* eslint-disable no-console */

async function initDb() {
  try {
    // Check if tables already exist
    const tables = await database.getQueryInterface().showAllTables();
    const tablesExist = tables.includes('app_users');

    if (!tablesExist) {
      // First time: create tables WITHOUT force (doesn't drop existing data)
      console.log('Creating database tables for the first time...');
      await database.query('PRAGMA foreign_keys = OFF');
      await database.sync();
      await database.query('PRAGMA foreign_keys = ON');
      console.log('All models were successfully created');

      // Seed only on first creation
      await seedDatabase();
      console.log('Database seeded');
    }
    else {
      // Tables exist: just verify connection
      console.log('Database tables already exist');
    }

    // start server
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}...`);
    });
  }
  catch (err) {
    console.error('Database initialization failed:', err);
  }
}

initDb();

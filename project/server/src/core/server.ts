import app from './app';
import config from './config';
import database from './database';

import '@/models';

/* eslint-disable no-console */

async function initDb() {
  try {
    // disable pks
    await database.query('PRAGMA foreign_keys = OFF');

    // sync db
    await database.sync({ alter: true });
    console.log('All models were successfully synchronized');

    // re-enable pks
    await database.query('PRAGMA foreign_keys = ON');

    // start server
    const port = config.port;
    app.listen(port, () => {
      console.log(`App is running on port ${port}...`);
    });
  }
  catch (err) {
    console.error('Database sync failed:', err);
  }
}

initDb();

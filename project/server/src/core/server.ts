import app from './app';
import config from './config';
import database from './database';

import '@/models';

/* eslint-disable no-console */

database.sync({ force: true })
  .then(() => {
    console.log('All models were successfully synchronized');

    const port = config.port;
    app.listen(port, () => {
      console.log(`App is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('Database sync failed:', err);
  });

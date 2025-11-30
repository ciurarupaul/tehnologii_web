import app from './app';
import config from './config';
import database from './database';

/* eslint-disable no-console */

database.sync({ alter: true }).then(() => {
  console.log('All models were successfully syncronized');
});

const port = config.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

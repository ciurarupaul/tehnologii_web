import path from 'node:path';
import { Sequelize } from 'sequelize';

// server/database/database.db
const dbPath = path.join(process.cwd(), 'database', 'database.db');

const database = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
});

export default database;

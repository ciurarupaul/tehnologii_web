import type { Database as SqliteDatabase } from 'better-sqlite3';

import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import path from 'node:path';

// server/database/database.db
const dbPath = path.join(process.cwd(), 'database', 'database.db');

// initialize db
const auth = betterAuth({
  database: new Database(dbPath) as SqliteDatabase,
  experimental: {
    joins: true,
  },
});

export default auth;

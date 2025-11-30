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

/*
steps (from no db file):
  1. mkdir database
  2. npx @better-auth/cli@latest generate --config ./src/lib/auth.ts --output ./database/migrations
  (script)  npm run db:generate
  3. npx @better-auth/cli migrate --config ./src/lib/auth.ts --migration ./better-auth_migrations
  (script)npm run db:migrate
*/

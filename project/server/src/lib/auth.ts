import type { Database as SqliteDatabase } from 'better-sqlite3';

import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import path from 'node:path';

import config from '@/core/config';

// server/database/database.db
const dbPath = path.join(process.cwd(), 'database', 'database.db');

// initialize db
const auth = betterAuth({
  database: new Database(dbPath) as SqliteDatabase,
  trustedOrigins: ['http://localhost:3000'],
  experimental: {
    joins: true,
  },
  socialProviders: {
    google: {
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    },
  },
});

export default auth;

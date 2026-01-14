import type { Auth } from 'better-auth';
import type { Database as SqliteDatabase } from 'better-sqlite3';

import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import path from 'node:path';
import { Pool } from 'pg';

import config from '@/core/config';

const isDevelopment = config.nodeEnv === 'development';

const database: SqliteDatabase | Pool = isDevelopment
  ? (new Database(path.join(process.cwd(), 'database', 'database.db')) as SqliteDatabase)
  : new Pool({
    connectionString: config.databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

const authConfig = {
  database,
  trustedOrigins: [
    config.localClientUrl || 'http://localhost:3000',
    ...(config.nodeEnv === 'production' ? [config.clientUrl || ''] : []),
  ],
  experimental: {
    joins: true,
  },
  socialProviders: {
    google: {
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    },
    github: {
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    },
  },
};

// Initialize auth with environment-appropriate database
const auth: Auth = betterAuth(authConfig);

export default auth;

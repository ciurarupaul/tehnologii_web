import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || '8000',
  nodeEnv: process.env.NODE_ENV || 'development',
  localClientUrl: process.env.LOCAL_CLIENT_URL || '',
  localServerUrl: process.env.LOCAL_SERVER_URL || '',
  clientUrl: process.env.CLIENT_URL || '',
  databaseUrl: process.env.DATABASE_URL || '',

  betterAuthSecret: process.env.BETTER_AUTH_SECRET || '',
  betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://localhost:8000',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
};

export default config;

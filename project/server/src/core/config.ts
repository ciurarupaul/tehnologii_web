import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || '8000',
  nodeEnv: process.env.NODE_ENV || 'development',
  localClientUrl: process.env.LOCAL_CLIENT_URL || '',
  localServerUrl: process.env.LOCAL_SERVER_URL || '',

  betterAuthSecret: process.env.BETTER_AUTH_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
};

export default config;

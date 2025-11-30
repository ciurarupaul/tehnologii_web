import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || '8000',
  nodeEnv: process.env.NODE_ENV || 'development',
  localClientUrl: process.env.LOCAL_CLIENT_URL || '',
  localServerUrl: process.env.LOCAL_SERVER_URL || '',
};

export default config;

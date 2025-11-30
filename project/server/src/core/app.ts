import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import globalErrorHandler, { notFoundHandler } from '@/utils/errors/globalErrorHandler';

import config from './config';

const app = express();

app.use(
  cors({
    origin: config.localClientUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

app.use(
  helmet({
    hidePoweredBy: true,
  }),
);

// parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(compression());

// routes

// error boundaries
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

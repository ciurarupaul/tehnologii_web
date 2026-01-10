import { toNodeHandler } from 'better-auth/node';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import auth from '@/lib/auth';
import adminRouter from '@/routes/adminRoutes';
import userRouter from '@/routes/userRoutes';
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

// handle better-auth routes - use before parsers
app.all('/api/auth/**', toNodeHandler(auth));

// parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(compression());

// routes
app.use('/api/admin', adminRouter);
app.use('/api/users', userRouter);

// error boundaries
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

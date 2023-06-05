import express, { Express } from 'express';
import cors from 'cors';
import { connectDb, disconnectDB, loadEnv } from './config';
import { usersRouter } from './routers/users-router';
import { authenticationRouter } from './routers/authentication-router';

// import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import GlobalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

export const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);

app.use('/api/v1', router);

app.use(GlobalErrorHandler);
app.use(notFound);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

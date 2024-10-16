import { ErrorRequestHandler } from 'express';
import config from '../config';

type TErrorSource = {
  path: string;
  message: string;
}[];

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'something went wrong';
  let ErrorSource: TErrorSource = [
    {
      path: '',
      message: 'error source is not found',
    },
  ];
  res.status(statusCode).json({
    success: false,
    message,
    ErrorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default GlobalErrorHandler;

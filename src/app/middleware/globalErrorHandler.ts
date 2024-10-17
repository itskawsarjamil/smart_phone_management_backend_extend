import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import HandleZodError from '../errors/handleZodError';
import { AppError } from '../errors/appError';
import HandleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/validationError';
import HandleDuplicateError from '../errors/handleDuplicateError';

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'something went wrong';
  let ErrorSource: TErrorSources = [
    {
      path: '',
      message: 'error source is not found',
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    ErrorSource = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    ErrorSource = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = HandleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    ErrorSource = simplifiedError?.errorSources;
  } else if (err.code === 11000) {
    const simplifiedError = HandleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    ErrorSource = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    ErrorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    ErrorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  // if (err)
  res.status(statusCode).json({
    success: false,
    message,
    ErrorSource,
    abcErr: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default GlobalErrorHandler;

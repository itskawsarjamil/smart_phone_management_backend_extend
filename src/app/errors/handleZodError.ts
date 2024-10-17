import { TErrorSources, TGenericErrorResponse } from './../interface/error';
import { ZodError, ZodIssue } from 'zod';

const HandleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode: 400,
    errorSources,
    message: 'Zod Validation Error',
  };
};

export default HandleZodError;

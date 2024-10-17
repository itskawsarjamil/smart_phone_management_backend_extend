import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import mongoose from 'mongoose';
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: value?.path,
      message: value?.message,
    }),
  );
  return {
    statusCode: 400,
    message: 'Mongoose Validation Error',
    errorSources,
  };
};

export default handleValidationError;

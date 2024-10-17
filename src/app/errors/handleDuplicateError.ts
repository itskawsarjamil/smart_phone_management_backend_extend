import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const HandleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  //   const result = err.message === err.errmsg;
  //   console.log(result);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID. Duplicate Id',
    errorSources,
  };
};

export default HandleDuplicateError;

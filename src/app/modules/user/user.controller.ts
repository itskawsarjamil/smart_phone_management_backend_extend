import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User Creation Successfull',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const userController = {
  createUser,
};

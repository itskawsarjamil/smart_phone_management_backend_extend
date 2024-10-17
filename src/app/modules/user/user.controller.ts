import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';
import { send } from 'process';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User Creation Successfull',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'all user getting successfull',
    statusCode: httpStatus.OK,
    data: result.result,
    meta: result.meta,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'single user getting successfull',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
};

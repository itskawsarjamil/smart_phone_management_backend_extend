import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const file = req.file;

  const result = await userServices.createUserIntoDB(file, req.body);

  sendResponse(res, {
    success: true,
    message: 'User Creation Successfull',
    statusCode: httpStatus.OK,
    data: result,
    // data: null,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const query = req.query;
  const modifiedQuery = { ...query };

  if (modifiedQuery?.priceRange) {
    const modifiedPriceRange: string[] = modifiedQuery.priceRange as string[];
    modifiedQuery.price = {
      $gte: modifiedPriceRange[0],
      $lte: modifiedPriceRange[1],
    };
  }
  // console.log(modifiedQuery);

  const result = await userServices.getAllUserFromDB(modifiedQuery);
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

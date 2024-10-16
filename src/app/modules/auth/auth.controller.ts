import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../config';
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserIntoDB(req.body);

  res.cookie('refreshToken', result.refreshToken, {
    sameSite: config.NODE_ENV === 'development' ? 'lax' : 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: config.NODE_ENV === 'development' ? false : true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user login successfull',
    data: {
      accessToken: result?.accessToken,
      needsPasswordChange: result?.needsPasswordChange,
    },
  });
});

export const authControllers = {
  loginUser,
};

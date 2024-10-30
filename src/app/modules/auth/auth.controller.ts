import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

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

const changePassword = catchAsync(async (req, res) => {
  const result = await authServices.changePassword(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'password change successfull',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'access token refreshed',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgetPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'forget password link sended',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await authServices.resetPassword(req.body, token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'password reset done',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await authServices.getMe(req.user as JwtPayload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user is retrieved successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  getMe,
};

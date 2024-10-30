import httpStatus from 'http-status';
import config from '../../config';
import { User } from '../user/user.model';
import { TAuth } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { AppError } from '../../errors/appError';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendEmail from '../../utils/sendEmail';

const loginUser = async (payload: TAuth) => {
  // const result=await

  const user = await User.findOne({
    $or: [
      { userName: payload.identifier },
      { email: payload.identifier },
      { contactNo: payload.identifier },
      { id: payload.identifier },
    ],
  }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user is not found');
  }

  // Compare the password
  const isMatch = await User.isPasswordMatched(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is wrong');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  const result = await User.findOneAndUpdate(
    { email: user.email },
    { lastLogin: new Date() },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, "last login time couldn't updated");
  }
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needPasswordChange,
  };
};

const changePassword = async (
  userInfo: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await User.isUserExist(userInfo.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'user is already deleted');
  }
  const isOldPasswordCorrect = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  );
  if (!isOldPasswordCorrect) {
    throw new AppError(httpStatus.CONFLICT, 'old password is not correct');
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userInfo.id,
      role: userInfo.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};
const refreshToken = async (refreshToken: string) => {
  const decoded = verifyToken(
    refreshToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const user = await User.findOne({
    id: decoded.id,
  });

  if (!user) {
    throw new AppError(httpStatus.CONFLICT, 'user is not exist');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'user is already deleted');
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};
const forgetPassword = async ({ id }: { id: string }) => {
  const user = await User.isUserExist(id);

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'user is not found');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'user is already deleted');
  }
  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );
  const resetUiLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUiLink);
  return resetUiLink;
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExist(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload.id !== decoded.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

const getMe = async ({ id, role }: JwtPayload) => {
  switch (role) {
    case 'user':
      User.findOne({ id: id, role: 'user' });
      break;
    case 'admin':
      User.findOne({ id: id, role: 'admin' });
      break;

    default:
      break;
  }
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  getMe,
};

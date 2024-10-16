import httpStatus from 'http-status';
import config from '../../config';
import { User } from '../user/user.model';
import { TAuth } from './auth.interface';
import { createToken } from './auth.utils';

const loginUserIntoDB = async (payload: TAuth) => {
  // const result=await

  const user = await User.findOne({
    $or: [
      { userName: payload.identifier },
      { email: payload.identifier },
      { contactNo: payload.identifier },
    ],
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user is not found');
  }

  // Compare the password
  const isMatch = await User.isPasswordMatched(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is wrong');
  }
  const jwtPayload = {
    email: user.email,
    // role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const needsPasswordChange = true;
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const authServices = { loginUserIntoDB };

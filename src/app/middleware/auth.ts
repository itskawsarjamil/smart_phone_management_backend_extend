import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../modules/auth/auth.utils';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { AppError } from '../errors/appError';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRules: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.FORBIDDEN, 'you have no token');
    }
    let decoded;
    try {
      decoded = verifyToken(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const { id, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExist(id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    if (
      await User.isJWTIssuedBeforePasswordChanged(
        iat as number,
        user.passwordChangedAt,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your token is not valid!');
    }
    if (!requiredRules.includes(user?.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = decoded as JwtPayload & { role: string };

    next();
  });
};

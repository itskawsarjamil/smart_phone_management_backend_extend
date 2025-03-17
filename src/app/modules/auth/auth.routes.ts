import { Request, Response, Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';
import { auth } from '../../middleware/auth';

const router = Router();

// router.get('',validateRequest,authController.)
router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'auth routes test' });
});
router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);
router.post(
  '/change-password',
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

router.post(
  '/forget-password',

  validateRequest(authValidations.forgetPasswordValidationSchema),

  authControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(authValidations.resetPasswordValidationSchema),
  authControllers.resetPassword,
);

export const AuthRoutes = router;

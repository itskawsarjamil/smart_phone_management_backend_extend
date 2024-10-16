import { Request, Response, Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

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

export const AuthRoutes = router;

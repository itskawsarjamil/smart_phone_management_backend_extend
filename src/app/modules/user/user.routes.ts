import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from './user.validation';
import { userController } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import { auth } from '../../middleware/auth';

const router = Router();

router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidations.createUserValidationSchema),
  userController.createUser,
);

router.get(
  '/get-all-user',
  auth('superAdmin', 'user'),
  userController.getAllUser,
);

router.get(
  '/get-single-user/:id',
  auth('superAdmin', 'user'),
  userController.getSingleUser,
);

export const userRoutes = router;

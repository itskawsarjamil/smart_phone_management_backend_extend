import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from './user.validation';
import { userController } from './user.controller';

const router = Router();

router.post(
  '/create-user',
  validateRequest(userValidations.createUserValidationSchema),
  userController.createUser,
);

router.get('/get-all-user', userController.getAllUser);

router.get('/get-single-user/:id', userController.getSingleUser);

export const userRoutes = router;

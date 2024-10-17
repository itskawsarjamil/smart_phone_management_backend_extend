import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from './user.validation';
import { userController } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.post(
  '/create-user',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.formData);
    next();
  },
  validateRequest(userValidations.createUserValidationSchema),
  userController.createUser,
);

router.get('/get-all-user', userController.getAllUser);

router.get('/get-single-user/:id', userController.getSingleUser);

export const userRoutes = router;

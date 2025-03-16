import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { smartPhoneValidations } from './smartPhone.validation';
import { smartPhoneController } from './smartPhone.controller';
import { auth } from '../../middleware/auth';

const routes = Router();

routes.post(
  '/create-smartphone',
  auth('user'),
  validateRequest(smartPhoneValidations.createSmartPhoneValidationSchema),
  smartPhoneController.createSmartPhone,
);
routes.get(
  '/get-all-smartphones',
  auth('user'),
  smartPhoneController.getAllSmartPhones,
);
routes.get(
  '/get-single-smartphone/:smartPhoneID',
  auth('user'),
  smartPhoneController.getSingleSmartPhone,
);
routes.patch(
  '/update-smartphone/:smartPhoneID',
  auth('user'),
  smartPhoneController.updateSmartPhone,
);
routes.patch(
  '/delete-smartphone/:smartPhoneID',
  auth('user'),
  smartPhoneController.deleteSmartPhone,
);
routes.patch(
  '/bulk-delete',

  auth('user'),

  smartPhoneController.bulkDeleteSmartPhone,
);

export const smartPhoneRouter = routes;

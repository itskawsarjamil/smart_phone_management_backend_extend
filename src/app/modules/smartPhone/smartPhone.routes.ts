import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { smartPhoneValidations } from './smartPhone.validation';
import { smartPhoneController } from './smartPhone.controller';
import { auth } from '../../middleware/auth';

const routes = Router();

routes.post(
  '/create-smartphone',
  auth('superAdmin', 'branchManager'),
  validateRequest(smartPhoneValidations.createSmartPhoneValidationSchema),
  smartPhoneController.createSmartPhone,
);
routes.get(
  '/get-all-smartphones',
  auth('superAdmin', 'branchManager', 'seller'),
  smartPhoneController.getAllSmartPhones,
);
routes.get(
  '/get-single-smartphone/:smartPhoneID',
  auth('superAdmin', 'branchManager', 'seller'),
  smartPhoneController.getSingleSmartPhone,
);
routes.patch(
  '/update-smartphone/:smartPhoneID',
  auth('superAdmin', 'branchManager'),
  smartPhoneController.updateSmartPhone,
);
routes.patch(
  '/delete-smartphone/:smartPhoneID',
  auth('superAdmin', 'branchManager'),
  smartPhoneController.deleteSmartPhone,
);
routes.patch(
  '/bulk-delete',

  auth('superAdmin', 'branchManager'),

  smartPhoneController.bulkDeleteSmartPhone,
);

export const smartPhoneRouter = routes;

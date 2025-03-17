import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { saleValidations } from './sale.validation';
import { saleController } from './sale.controller';
import { auth } from '../../middleware/auth';

const routes = Router();

routes.post(
  '/create-sale',
  auth('superAdmin', 'seller'),
  validateRequest(saleValidations.createSaleValidationSchema),
  saleController.createSale,
);
routes.get(
  '/get-all-sales',
  auth('superAdmin', 'seller'),
  saleController.getAllSales,
);
routes.get(
  '/get-single-sale/:saleID',
  auth('superAdmin', 'seller'),
  saleController.getSingleSale,
);

export const saleRouter = routes;

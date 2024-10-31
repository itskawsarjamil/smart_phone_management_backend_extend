import { z } from 'zod';

const createSaleValidationSchema = z.object({
  body: z.object({
    smartPhone: z.string(),
    quantitySold: z.number(),
    buyerName: z.string(),
    saleDate: z.any().optional(),
  }),
});

export const saleValidations = {
  createSaleValidationSchema,
};

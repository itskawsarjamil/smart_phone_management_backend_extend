import { z } from 'zod';

const createSmartPhoneValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    brand: z.string(),
    model: z.string(),
    os: z.string(),
    storage: z.string(),
    screenSize: z.string(),
    cameraQuality: z.string(),
    batteryLifee: z.number(),
    releaseDate: z.any(),
  }),
});

export const smartPhoneValidations = {
  createSmartPhoneValidationSchema,
};

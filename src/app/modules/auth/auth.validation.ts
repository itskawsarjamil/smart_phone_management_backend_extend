import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(1, { message: 'Username, email, or ID is required' }) // Ensures at least one identifier is provided
      .refine(
        (input) =>
          // This regex checks if the input is an email format
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) ||
          // This checks if the input is a valid username (simple alphanumeric check)
          /^[a-zA-Z0-9_]{3,30}$/.test(input) ||
          // validating for mobile no or not
          /^0\d{10}$/.test(input),
        { message: 'Please provide a valid username, email, or contactNo' },
      ),

    // Password must be provided
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const authValidations = {
  loginValidationSchema,
};

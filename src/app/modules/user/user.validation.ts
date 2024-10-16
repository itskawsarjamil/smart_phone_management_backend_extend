import { z } from 'zod';
const nameSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First Name must be at least 3 characters long')
    .max(50, 'First Name cannot exceed 50 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, 'Last Name must be at least 3 characters long')
    .max(50, 'Last Name cannot exceed 50 characters'),
});
const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: nameSchema,
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(30, 'Username cannot exceed 30 characters'),
    email: z.string().email('Please enter a valid email address'),
    bio: z.string().max(250, 'Bio cannot exceed 250 characters').optional(),
    profileImg: z.string().url('Profile Image must be a valid URL').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    contactNo: z
      .string()
      .regex(
        /^0\d{10}$/,
        'Please provide a valid contact number (e.g., 01234567890)',
      ),
    emergencyContactNo: z
      .string()
      .regex(
        /^0\d{10}$/,
        'Please provide a valid emergency contact number (e.g., 01234567890)',
      ),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z
      .string()
      .min(5, 'Present address must be at least 5 characters long')
      .max(100, 'Present address cannot exceed 100 characters'),
    permanentAddress: z
      .string()
      .min(5, 'Permanent address must be at least 5 characters long')
      .max(100, 'Permanent address cannot exceed 100 characters'),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};

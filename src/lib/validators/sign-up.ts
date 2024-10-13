import { z } from 'zod';
import { StrongPasswordValidator } from '@/lib/validators/common';

export const SignUpValidator = z
  .object({
    email: z.string().email().trim(),
    firstname: z.string().trim().min(3).max(64),
    lastname: z.string().trim().min(3).max(64),
    password: StrongPasswordValidator(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type SignUpFormData = z.infer<typeof SignUpValidator>;

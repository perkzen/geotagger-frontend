import { z } from 'zod';
import { strongPassword } from '@/lib/validators/common';

export const SignUpValidator = z
  .object({
    email: z.string().email(),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    password: strongPassword(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type SignUpFormData = z.infer<typeof SignUpValidator>;

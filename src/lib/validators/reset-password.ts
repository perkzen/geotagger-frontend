import { z } from 'zod';
import { StrongPasswordValidator } from '@/lib/validators/common';

export const ResetPasswordValidator = z
  .object({
    newPassword: StrongPasswordValidator(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type ResetPasswordData = z.infer<typeof ResetPasswordValidator>;

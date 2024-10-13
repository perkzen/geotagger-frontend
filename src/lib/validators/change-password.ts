import { z } from 'zod';
import { StrongPasswordValidator } from '@/lib/validators/common';

export const ChangePasswordValidator = z
  .object({
    currentPassword: z.string(),
    newPassword: StrongPasswordValidator(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordValidator>;

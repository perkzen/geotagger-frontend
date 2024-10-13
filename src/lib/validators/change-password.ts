import { z } from 'zod';
import { strongPassword } from '@/lib/validators/common';

export const ChangePasswordValidator = z
  .object({
    currentPassword: z.string(),
    newPassword: strongPassword(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordValidator>;

import { z } from 'zod';

export const ForgotPasswordValidator = z.object({
  email: z.string().trim().email({
    message: 'Valid email is required',
  }),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordValidator>;

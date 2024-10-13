import { z } from 'zod';

export const SignInValidator = z.object({
  email: z.string().trim().email({
    message: 'Invalid email format',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required',
  }),
});

export type SignInFormData = z.infer<typeof SignInValidator>;

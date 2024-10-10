import { z } from 'zod';

export const SignInValidator = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export type SignInFormData = z.infer<typeof SignInValidator>;

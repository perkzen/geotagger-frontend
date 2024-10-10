import { z } from 'zod';

export const strongPassword = () =>
  z
    .string()
    .min(8)
    .refine(
      (data) => {
        const strongRegex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        );
        return strongRegex.test(data);
      },
      {
        message:
          'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character',
      }
    );

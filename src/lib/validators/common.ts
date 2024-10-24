import { z } from 'zod';

export const StrongPasswordValidator = () =>
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

export const ImageValidator = (
  maxFileSizeBytes: number,
  allowedTypes: string[] = []
) => {
  return z
    .custom<FileList>()
    .refine((files) => files.length > 0, {
      message: 'Image is required',
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= maxFileSizeBytes),
      {
        message: `Image size must be less than ${maxFileSizeBytes / (1024 * 1024)}MB`,
      }
    )
    .refine(
      (files) =>
        allowedTypes.length === 0 ||
        Array.from(files).every((file) => allowedTypes.includes(file.type)),
      {
        message: `Allowed image types: ${allowedTypes.join(', ')}`,
      }
    );
};

export const LatValidator = z.number().min(-90).max(90);

export const LngValidator = z.number().min(-180).max(180);

'use client';
import { z } from 'zod';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/lib/constants/file-sizes';

export const ProfilePictureValidator = z.object({
  fileList: z
    .custom<FileList>()
    .refine((files) => files.length > 0, {
      message: 'Image is required',
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.size <= MAX_FILE_SIZE_BYTES),
      {
        message: `Image size must be less than ${MAX_FILE_SIZE_MB}MB`,
      }
    ),
});

export type ProfilePictureFormData = z.infer<typeof ProfilePictureValidator>;

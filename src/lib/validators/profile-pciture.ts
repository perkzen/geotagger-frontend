'use client';
import { z } from 'zod';
import { MAX_FILE_SIZE_BYTES } from '@/lib/constants/file-sizes';
import { ImageValidator } from '@/lib/validators/common';

export const ProfilePictureValidator = z.object({
  fileList: ImageValidator(MAX_FILE_SIZE_BYTES, ['image/jpeg', 'image/png']),
});

export type ProfilePictureFormData = z.infer<typeof ProfilePictureValidator>;

import { z } from 'zod';
import { MAX_FILE_SIZE_BYTES } from '@/lib/constants/file-sizes';
import {
  ImageValidator,
  LatValidator,
  LngValidator,
} from '@/lib/validators/common';

export const AddLocationValidator = z
  .object({
    address: z
      .string()
      .trim()
      .min(2, { message: 'Address must be at least 2 characters long' })
      .max(255, { message: 'Address must be less than 255 characters long' }),
    lat: LatValidator,
    lng: LngValidator,
    fileList: ImageValidator(MAX_FILE_SIZE_BYTES, ['image/jpeg', 'image/png']),
  })
  .refine(
    (data) => {
      return data.lat !== undefined && data.lng !== undefined;
    },
    {
      message: 'Please select a location on the map',
      path: ['address'],
    }
  );

export type AddLocationFormData = z.infer<typeof AddLocationValidator>;

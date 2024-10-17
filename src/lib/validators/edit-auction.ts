import { z } from 'zod';
import { MAX_FILE_SIZE_BYTES } from '@/lib/constants/file-sizes';
import { ImageValidator } from '@/lib/validators/common';

export const EditLocationValidator = z.object({
  fileList: ImageValidator(MAX_FILE_SIZE_BYTES, ['image/jpeg', 'image/png']),
});

export type EditLocationFormData = z.infer<typeof EditLocationValidator>;

import { z } from 'zod';
import { LatValidator } from '@/lib/validators/common';

export const AddGuessValidator = z.object({
  lat: LatValidator,
  lng: LatValidator,
});


export type AddGuessFormData = z.infer<typeof AddGuessValidator>;